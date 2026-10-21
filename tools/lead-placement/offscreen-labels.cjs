'use strict';
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const out=process.env.LEAD_OFFSCREEN_OUT;
if(out)fs.mkdirSync(out,{recursive:true});
(async()=>{
  const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:1000}});
    await page.addInitScript(()=>{
      const OriginalObserver=IntersectionObserver;
      window.__torsoVisible=null;window.__leadDraws=0;
      window.IntersectionObserver=class extends OriginalObserver{
        constructor(callback,options){super((entries,observer)=>{
          for(const entry of entries)if(entry.target.matches('.lead-3d-viewport'))window.__torsoVisible=entry.isIntersecting;
          callback(entries,observer);
        },options);}
      };
      for(const proto of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype]){
        const draw=proto.drawElements;
        proto.drawElements=function(...args){window.__leadDraws++;return draw.apply(this,args);};
      }
    });
    await page.goto(process.env.CARDIO_BASE_URL||'http://127.0.0.1:8862/');
    await page.click('#leadPlacementLaunch');
    await page.waitForSelector('#lead3DHost[data-ready="true"]');
    await page.evaluate(()=>LeadPlacementLab.setStep(LEAD_PLACEMENT.guided.findIndex(step=>step.id==='review')));
    await page.locator('.lead-3d-viewport').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>window.__torsoVisible===true);
    assert.equal(await page.locator('.lead-3d-marker-button.chest:visible').count(),1);
    const storage=await page.evaluate(()=>({...localStorage}));
    await page.locator('#leadAllLabels').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>window.__torsoVisible===false);
    const drawsBefore=await page.evaluate(()=>window.__leadDraws);
    await page.click('#leadAllLabels');
    // Same bounded observation as the original full-suite gate.
    await page.waitForTimeout(100);
    const state=await page.evaluate(()=>({visible:window.__torsoVisible,draws:window.__leadDraws,all:document.querySelector('#lead3DHost').dataset.allLabels,labels:[...document.querySelectorAll('.lead-3d-marker-button.chest')].map(el=>({id:el.dataset.marker,hidden:el.hidden,visibility:el.style.visibility}))}));
    const offscreenCount=await page.locator('.lead-3d-marker-button.chest:visible').count();
    if(out)fs.writeFileSync(path.join(out,'observation.json'),JSON.stringify({drawsBefore,offscreenCount,state},null,2)+'\n');
    assert.equal(state.visible,false);
    assert.equal(state.all,'true');
    assert(offscreenCount>=2,'All-labels must update DOM while the torso is offscreen');
    assert.equal(state.draws,drawsBefore,'Offscreen label updates must not submit GPU draws');
    await page.locator('.lead-3d-viewport').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>window.__torsoVisible===true);
    assert.equal(await page.locator('.lead-3d-marker-button.chest:visible').count(),6);
    assert.deepEqual(await page.evaluate(()=>({...localStorage})),storage);
    if(out){await page.screenshot({path:path.join(out,'labels-returned.png')});fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({passed:true,drawsBefore,offscreenCount,state,limits:'Cloud Chromium; offscreen controls and DOM readiness, not physical-device validation.'},null,2)+'\n');}
    console.log('PASS: offscreen All-labels updates, zero offscreen GPU submissions, six labels on return, unchanged study storage.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
