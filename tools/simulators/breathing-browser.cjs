const {chromium}=require('playwright'),A=require('node:assert/strict'),fs=require('node:fs');
const M=require('../../respiratory-study/mechanics.js');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1024,height:768},hasTouch:true}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));const external=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:')&&!r.url().startsWith('data:'))external.push(r.url());});
 const sample=()=>page.evaluate(()=>({scene:CardiorespiratoryStudy.inspectBreathing(),model:CardiorespiratoryStudy.getMechanics()}));
 const scrub=t=>page.locator('[data-clock]').evaluate((e,t)=>{e.value=t;e.dispatchEvent(new Event('input',{bubbles:true}));},t);
 const param=async(k,v)=>{const e=page.locator(`[data-mechanics="${k}"]`);if(k==='mode')await e.selectOption(v);else{await e.fill(String(v));await e.press('Tab');}};
 try {
  await page.goto(process.env.CARDIO_BASE_URL||'http://127.0.0.1:8765/');await page.click('#respiratorySimulatorLaunch');await page.waitForSelector('[data-dynamic=true]');
  A.equal(await page.locator('canvas').count(),1);const initial=await sample();await scrub(2);const peak=await sample();A.ok(peak.model.excursion>.49);
  for(const d of peak.scene.vertices.filter(d=>!['ribs','diaphragm'].includes(d.name)))for(let i=0;i<d.rest.length;i+=3){const expected=M.deform(d.rest.slice(i,i+3),peak.model.excursion);expected.forEach((x,j)=>A.ok(Math.abs(x-d.current[i+j])<2e-6));}
  const base=peak.scene.vertices.find(d=>d.name==='right-lower');A.ok(base.current[4]<base.rest[4]);
  const diaphragm=peak.scene.vertices.find(d=>d.name==='diaphragm'),rib=peak.scene.vertices.find(d=>d.name==='ribs');A.notDeepEqual(diaphragm.current,diaphragm.rest);A.notDeepEqual(rib.current,rib.rest);
  await page.selectOption('[data-breath-select]','right-lower');const before=JSON.parse(await page.locator('[data-dynamic]').getAttribute('data-anchor'));await scrub(0);const after=JSON.parse(await page.locator('[data-dynamic]').getAttribute('data-anchor'));A.notDeepEqual(before,after);
  await page.click('[data-breath-view="side"]');A.ok((await sample()).scene.camera.yaw>1);await page.click('[data-breath-reset]');A.equal((await sample()).scene.camera.yaw,0);
  await param('rate',20);await param('target',.8);A.equal((await sample()).model.period,3);await scrub(1.2);A.ok(Math.abs((await sample()).model.delivered-.8)<1e-8);
  await page.click('[data-resp-phase="4"]');A.equal((await sample()).model.seconds,3);A.match(await page.locator('[data-resp-clock]').textContent(),/40.0 mmHg/);await page.click('[data-resp-phase="0"]');A.match(await page.locator('[data-resp-clock]').textContent(),/Clearing/);
  await page.locator('[data-mechanics="mode"]').locator('xpath=ancestor::details').locator('summary').click();
  await param('mode','effort');const effort=(await sample()).model.amplitude,original=(await sample()).model.delivered;await param('resistance',20);A.equal((await sample()).model.amplitude,effort);A.ok((await sample()).model.delivered<original);
  await page.selectOption('[data-ventilation]','positive');await scrub(.8);const positive=(await sample()).model;A.ok(positive.airway>0);A.equal(positive.pleural,-5);
  await page.click('[data-play]');await page.waitForTimeout(600);await page.click('[data-play]');const paused=await sample();await page.waitForTimeout(300);A.equal((await sample()).model.seconds,paused.model.seconds);
  await page.click('[data-breath-play]');await page.waitForTimeout(100);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>!CardiorespiratoryStudy.getState().playing);A.equal(await page.evaluate(()=>CardiorespiratoryStudy.getState().playing),false);A.equal(await page.locator('[data-breath-play]').textContent(),'Play simulation');
  await page.selectOption('[data-breath-mode]','alveolar');A.match(await page.locator('[data-breath-status]').textContent(),/O₂ diffuses air → blood.*CO₂ blood → air/);await page.click('[data-breath-view="oblique"]');A.equal((await sample()).scene.mode,'alveolar');
  await page.selectOption('[data-breath-mode]','whole');await page.click('[data-breath-touch]');A.equal(await page.locator('.sim-breath-canvas canvas').evaluate(e=>e.style.touchAction),'none');
  await page.locator('.sim-breath-canvas canvas').scrollIntoViewIfNeeded();
  const cdp=await page.context().newCDPSession(page),box=await page.locator('.sim-breath-canvas canvas').boundingBox(),x=box.x+box.width/2,y=box.y+box.height/2;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-30,y,id:1},{x:x+30,y,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-40,y,id:1},{x:x+40,y,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-70,y,id:1},{x:x+70,y,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});A.ok((await sample()).scene.camera.distance<7.5);await page.click('[data-breath-touch]');A.equal(await page.locator('.sim-breath-canvas canvas').evaluate(e=>e.style.touchAction),'pan-y');
  await page.click('[data-breath-fullscreen]');await page.waitForTimeout(100);if(await page.evaluate(()=>!!document.fullscreenElement)){await page.click('[data-exit-breath-fullscreen]');A.equal(await page.evaluate(()=>!!document.fullscreenElement),false);}
  for(const width of [390,768,1024]){await page.setViewportSize({width,height:900});await page.click('[data-text-size]');await page.locator('.sim-breath-viewport').scrollIntoViewIfNeeded();const bounds=await page.locator('[data-breath-label]').boundingBox(),frame=await page.locator('.sim-breath-viewport').boundingBox();A.ok(bounds.x>=frame.x&&bounds.x+bounds.width<=frame.x+frame.width+1);await page.click('[data-text-size]');}
  await page.click('[data-load-anatomy]');await page.waitForSelector('[data-organ-host][data-ready=true]:not([data-dynamic=true])',{timeout:30000});A.equal(await page.locator('canvas').count(),1);
  await page.click('[data-load-breathing]');await page.waitForSelector('[data-dynamic=true]');A.equal(await page.locator('canvas').count(),1);
  await page.click('[data-home]');A.equal(await page.locator('canvas').count(),0);await page.click('#heartSimulatorLaunch');A.equal(await page.locator('[data-mechanics]').count(),0);
  A.deepEqual(errors,[]);A.deepEqual(external,[]);console.log('PASS moving scene: actual nonuniform vertices, diaphragm/ribs, moving anchors, rate/depth/drive effects, capnography boundaries, pressure mode, pause, 3D exchange, touch pinch/unlock, fullscreen exit, labels, one renderer and heart transition.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
