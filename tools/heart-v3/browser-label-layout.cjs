/* H3-13/F01: actual GL, complete stable identity selector and readable focused name at200%. */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1024,height:900}}),errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto(process.env.BASE_URL||'http://127.0.0.1:8765/');await page.click('#heartV3Launch');await page.waitForFunction(()=>!!HeartV3Study.inspect().renderer);
  await page.click('[data-h3-action="inspector"]');await page.click('[data-h3-action="route"][data-h3-route="routeD"]');await page.locator('[data-h3-breadcrumbs] [data-h3-stage="exchange"]').click();
  await page.waitForFunction(()=>HeartV3Study.inspect().renderer?.lastRenderedDetailStage==='routeD.exchange');fs.mkdirSync('review-heart-v3',{recursive:true});
  const inventory=await page.locator('[data-h3-detail-identity] option').evaluateAll(es=>es.map(e=>({id:e.value,name:e.textContent})));
  assert.equal(inventory.length,3);assert.equal(new Set(inventory.map(x=>x.id)).size,3);
  for(const width of [390,768,1024]){
   await page.setViewportSize({width,height:1000});await page.locator('[data-h3-text-size]').selectOption('2');
   for(const identity of inventory){
    await page.locator('[data-h3-detail-identity]').selectOption(identity.id);await page.locator('.h3-stage').scrollIntoViewIfNeeded();
    await page.waitForFunction(id=>document.querySelector('[data-h3-detail-identity]').value===id,identity.id);await page.waitForTimeout(100);
    const layout=await page.evaluate(()=>{
     const root=document.querySelector('#heartV3Study'),stage=root.querySelector('.h3-stage'),name=root.querySelector('[data-h3-identity-name]');
     const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
     const controls=[root.querySelector('[data-h3-orientation]'),root.querySelector('[data-h3-action="fullscreen"]'),...root.querySelectorAll('.h3-detail-marker')].filter(el=>!el.hidden&&el.getBoundingClientRect().width>0).map(el=>({text:el.textContent,rect:rect(el)}));
     const words=[];for(const match of name.textContent.matchAll(/[A-Za-z]{7,}/g)){const range=document.createRange();range.setStart(name.firstChild,match.index);range.setEnd(name.firstChild,match.index+match[0].length);words.push({word:match[0],lines:range.getClientRects().length});}
     const anchor=root.querySelector('[data-h3-identity-anchor]'),svg=anchor?.ownerSVGElement,box=svg?.viewBox.baseVal;
     return {stage:rect(stage),key:rect(root.querySelector('[data-h3-detail-key]')),controls,name:{text:name.textContent,wordBreak:getComputedStyle(name).wordBreak,words},anchor:anchor?{x:+anchor.getAttribute('cx'),y:+anchor.getAttribute('cy'),width:box.width,height:box.height}:null,pageOverflow:document.documentElement.scrollWidth>innerWidth+1,renderStage:HeartV3Study.inspect().renderer.lastRenderedDetailStage};
    });
    assert.equal(layout.renderStage,'routeD.exchange');assert.equal(layout.pageOverflow,false);assert.equal(layout.name.text,identity.name);assert(layout.key.y>=layout.stage.bottom-1,'focused full name follows the scene at200%');
    assert(layout.anchor&&Number.isFinite(layout.anchor.x)&&Number.isFinite(layout.anchor.y));assert(layout.anchor.x>=0&&layout.anchor.x<=layout.anchor.width&&layout.anchor.y>=0&&layout.anchor.y<=layout.anchor.height);
    for(const c of layout.controls){assert(c.rect.x>=layout.stage.x-1&&c.rect.right<=layout.stage.right+1);assert(c.rect.y>=layout.stage.y-1&&c.rect.bottom<=layout.stage.bottom+1);}
    for(let i=0;i<layout.controls.length;i++)for(let j=i+1;j<layout.controls.length;j++){const a=layout.controls[i].rect,b=layout.controls[j].rect;assert(!(Math.min(a.right,b.right)-Math.max(a.x,b.x)>.5&&Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>.5),'orientation/exit/selected badge do not overlap');}
    assert.equal(layout.name.wordBreak,'normal');for(const word of layout.name.words)assert.equal(word.lines,1,'word remains whole: '+word.word);
    results.push({width,identity,layout});
   }
   const stage=await page.locator('.h3-stage').boundingBox(),key=await page.locator('[data-h3-detail-key]').boundingBox();await page.screenshot({path:`review-heart-v3/detail-labels-${width}-200.png`,clip:{x:stage.x,y:stage.y,width:stage.width,height:key.y+key.height-stage.y}});
  }
  assert.deepEqual(errors,[]);fs.writeFileSync('review-heart-v3/label-layout-result.json',JSON.stringify({passed:true,checks:['actual GL exchange','all3 stable selectable identities at390/768/1024 text200','focused full names in ordinary flow','selected anchors inside actual scene','whole long words','orientation/exit/selected badge pairwise nonoverlap','no page overflow'],inventory,results,errors},null,2));console.log('Heart v3 current identity-selector GL label-layout checks passed');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
