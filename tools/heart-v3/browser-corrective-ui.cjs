/* Owner corrective V-04/V-05: real organ-first viewport and synchronized causal controls. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[],dir='/workspace/scratch/heart-v3-ui-corrective';
 fs.mkdirSync(dir,{recursive:true});page.on('pageerror',e=>errors.push(e.message));
 const inspector=async open=>{if(await page.locator('[data-h3-inspector]').evaluate(e=>e.open)!==open)await page.locator('[data-h3-action="inspector"]').click();};
 const rects=()=>page.evaluate(()=>{const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};const svg=document.querySelector('[data-h3-teaching-plot] svg');return{stage:box('.h3-stage'),transport:box('.h3-transport'),live:box('.h3-live-panel'),trace:box('[data-h3-teaching-plot]'),phase:box('[data-h3-phase-buttons]'),axisPx:parseFloat(getComputedStyle(svg.querySelector('text')).fontSize)*svg.getBoundingClientRect().width/360,inspectorOpen:document.querySelector('[data-h3-inspector]').open,sourceNoteVisible:getComputedStyle(document.querySelector('#home>.src-note')).display!=='none'};});
 try{
  await page.goto(process.env.BASE_URL||'http://127.0.0.1:8765/');await page.locator('#heartV3Launch').click();await page.waitForFunction(()=>!!HeartV3Study.inspect().renderer);
  assert.equal(await page.evaluate(()=>HeartV3Study.getState().mode),'whole');assert.match(await page.locator('[data-h3-representation-status]').textContent(),/Authored teaching exterior/);
  assert.equal(await page.locator('[data-h3-preset="opening"]').isDisabled(),true);
  await page.locator('[data-h3-inspect-valve="mitral"]').click();assert.equal(await page.evaluate(()=>HeartV3Study.getState().mode),'cutaway');
  const native=[];
  for(const [width,height]of[[1024,768],[1024,900],[1280,900],[1440,1080]]){
   await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));
   for(const trace of ['ecg','left-pressure','right-pressure','volume']){
    await page.locator('[data-h3-teaching-trace]').selectOption(trace);
    for(const phase of ['passive-filling','isovolumetric-contraction','ejection','isovolumetric-relaxation']){
     await page.locator(`[data-h3-phase="${phase}"]`).click();await page.evaluate(()=>scrollTo(0,0));const r=await rects();
     assert.equal(r.inspectorOpen,false);assert.equal(r.sourceNoteVisible,false);assert(r.stage.width>=(width===1024?650:850)&&r.stage.height>=(height===768?395:500));
     for(const key of ['stage','transport','live','trace','phase'])assert(r[key].y>=0&&r[key].bottom<=height+1,`${key} co-visible at${width}×${height} ${trace}/${phase}: ${JSON.stringify(r[key])}`);
     assert(r.axisPx>=12,'readable primary axis text');native.push({width,height,trace,phase,...r});
    }
   }
   await page.locator('[data-h3-teaching-trace]').selectOption('ecg');await page.locator('[data-h3-phase="passive-filling"]').click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${dir}/corrective-ui-${width}-${height}.png`});
  }
  for(const phase of ['isovolumetric-contraction','ejection','isovolumetric-relaxation']){
   await page.locator(`[data-h3-phase="${phase}"]`).click();const s=await page.evaluate(()=>HeartV3Study.getState());assert.equal(s.sample.leftPhase,phase);
   for(const id of ['mitral','tricuspid','aortic','pulmonary'])assert.equal(await page.locator(`[data-h3-compact-valve="${id}"]`).textContent(),s.sample.valves[id].open?'Open':'Closed');
   const x=Number(await page.locator('[data-h3-teaching-plot] [data-h3-marker]').getAttribute('x1'));assert(Math.abs(x-(40+s.sample.cycleFraction*304))<.001);
  }
  const before=await page.evaluate(()=>({time:HeartV3Study.getState().time,camera:HeartV3Study.inspect().camera}));await inspector(true);await inspector(false);
  assert.equal(await page.evaluate(()=>HeartV3Study.getState().time),before.time);assert.deepEqual(await page.evaluate(()=>HeartV3Study.inspect().camera),before.camera);await inspector(true);await page.locator('[data-h3-select]').selectOption('papillary');assert.equal(await page.locator('[data-h3-preset="opening"]').isDisabled(),true);await page.locator('[data-h3-select]').selectOption('mitral');await inspector(false);
  await page.locator('[data-h3-preset="opening"]').click();assert.match(await page.locator('[data-h3-orientation]').textContent(),/Oblique opening view/);assert.equal(await page.evaluate(()=>HeartV3Study.getState().time),before.time);
  await page.locator('[data-h3-preset="attachments"]').click();await inspector(true);await page.locator('[data-h3-labels]').uncheck();await inspector(false);assert.equal(await page.locator('.heart-v3-labels button:visible').count(),0);assert.equal(await page.locator('[data-h3-label-layer]').isVisible(),false);assert.equal(await page.locator('[data-h3-selected-context]').textContent(),'Structure name hidden');await inspector(true);await page.locator('[data-h3-labels]').check();await inspector(false);
  for(const trace of ['left-pressure','right-pressure','volume','ecg']){await page.locator('[data-h3-teaching-trace]').selectOption(trace);const curve=await page.locator('[data-h3-teaching-plot] .h3-curve').first().getAttribute('d');await page.locator('[data-h3-scrub]').evaluate(e=>{e.value='.36';e.dispatchEvent(new Event('input',{bubbles:true}));});assert.equal(await page.locator('[data-h3-teaching-plot] .h3-curve').first().getAttribute('d'),curve);assert.equal(await page.evaluate(()=>HeartV3Study.getState().time),.36);}
  const focusTime=await page.evaluate(()=>HeartV3Study.getState().time);await page.locator('[data-h3-action="fullscreen"]').click();assert.equal(await page.evaluate(()=>document.fullscreenElement?.matches('[data-h3-teaching-shell]')),true);assert(await page.locator('.h3-transport').isVisible());assert(await page.locator('.h3-live-panel').isVisible());await page.locator('[data-h3-action="fullscreen"]').click();assert.equal(await page.evaluate(()=>!!document.fullscreenElement),false);assert.equal(await page.evaluate(()=>HeartV3Study.getState().time),focusTime);
  const widths=[];
  for(const width of [390,768,1024,1280]){
   await page.setViewportSize({width,height:width<700?844:1024});
   for(const scale of ['1','2']){
    await inspector(true);await page.locator('[data-h3-text-size]').selectOption(scale);await inspector(false);
    const result=await page.evaluate(()=>{const root=document.querySelector('#heartV3Study'),stage=root.querySelector('.h3-stage').getBoundingClientRect(),buttons=[...root.querySelectorAll('.h3-modes button,.h3-transport button,.h3-phase-buttons button,.h3-valve-cards button')];return{stage:{width:stage.width,height:stage.height},overflow:document.documentElement.scrollWidth>innerWidth+1,tooSmall:buttons.filter(b=>b.getBoundingClientRect().height<43.9).map(b=>b.textContent),time:HeartV3Study.getState().time};});
    assert.equal(result.overflow,false,'reflow '+width+' @'+scale);const minWidth=scale==='1'&&width===1024?650:Math.min(width-70,900);assert(result.stage.width>=minWidth&&result.stage.height>=390,'organ is not compressed '+width+' @'+scale+' '+JSON.stringify(result));assert.deepEqual(result.tooSmall,[]);assert.equal(result.time,focusTime);await page.locator('.h3-stage').scrollIntoViewIfNeeded();await page.screenshot({path:`${dir}/corrective-ui-${width}-text${scale}.png`});widths.push({width,scale,...result});
   }
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(dir+'/corrective-ui-result.json',JSON.stringify({passed:true,native,widths,checks:['1024×768/900 and1280/1440 organ/transport/phase/fourvalves/all selected traces co-visible','collapsed inspector preserves pausedtime/exactcamera','same-sample phase/valve/marker synchronization','static primary trace paths','zero labels when unchecked','valve opening/attachment enabled only for gross valves and pitch-aware orientation','fullscreen teaching shell controls and exit','390/768/1024/1280 at100/200% no compression/overflow and44px targets'],errors,inspection:await page.evaluate(()=>HeartV3Study.inspect())},null,2));console.log('Corrective organ-first UI browser checks passed');
 }catch(error){fs.writeFileSync(dir+'/corrective-ui-failure-'+Date.now()+'.json',JSON.stringify({error:String(error),stack:error.stack,errors,inspection:await page.evaluate(()=>window.HeartV3Study?.inspect()).catch(()=>null)},null,2));await page.screenshot({path:dir+'/corrective-ui-failure-'+Date.now()+'.png'}).catch(()=>{});throw error;}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
