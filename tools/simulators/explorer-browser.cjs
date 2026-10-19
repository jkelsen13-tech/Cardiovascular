const {chromium}=require('playwright'),A=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1280,height:1000},hasTouch:true}),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 const inspect=()=>page.evaluate(()=>CardiorespiratoryStudy.inspectBreathing()),model=()=>page.evaluate(()=>CardiorespiratoryStudy.getMechanics());
 try{
  await page.goto(process.env.CARDIO_BASE_URL||'http://127.0.0.1:8765/');if(await page.locator('#respiratorySimulatorLaunch').count())await page.click('#respiratorySimulatorLaunch');await page.waitForSelector('[data-dynamic=true]');
  const host=page.locator('[data-explorer="3d"]');A.equal((await inspect()).explorer.detailLoaded,false);A.ok(!requests.some(u=>u.includes('explorer-detail.js')));
  await page.locator('[data-clock]').evaluate(e=>{e.value='1.23';e.dispatchEvent(new Event('input',{bubbles:true}));});
  await page.selectOption('[data-breath-select]','left-lower');await page.click('[data-breath-view="oblique"]');await page.click('[data-breath-zoom="-0.6"]');const original=await inspect(),time=(await model()).seconds;
  await host.locator('[data-explorer-source]').selectOption('left-posterior-basal-segment');await page.waitForTimeout(450);
  let s=await inspect();A.equal(s.explorer.side,'left');A.equal(s.explorer.lobe,'left-lower');A.equal(s.selected,'VH_F_left_posterior_basal_bronchus');A.notDeepEqual(s.camera.target,original.camera.target);A.ok(s.camera.distance<original.camera.distance);
  const anchor=s.explorer.parentAnchor;
  for(const stage of ['smaller','bronchioles','terminal','respiratory','ducts','sacs','alveoli','membrane']){
   await page.click('[data-explorer-quick-next]');await page.waitForFunction(stage=>CardiorespiratoryStudy.inspectBreathing().explorer.stage===stage,stage);await page.waitForTimeout(450);s=await inspect();
   A.equal(s.explorer.stage,stage);A.equal(s.explorer.segment,'left-posterior-basal-segment');A.deepEqual(s.explorer.parentAnchor,anchor);A.equal((await model()).seconds,time);A.equal(await page.locator('canvas').count(),1);
   if(s.mode==='detail'){A.equal(s.explorer.detailBudget.diffusionParticles,0);A.ok(s.explorer.detailBudget.triangles<5000);}
  }
  A.match(await host.locator('[data-explorer-boundary]').textContent(),/MAGNIFIED INSTRUCTIONAL RECONSTRUCTION/);A.match(await page.locator('[data-breath-status]').textContent(),/O₂ diffuses air → blood.*CO₂ blood → air/);
  await host.locator('[data-explorer-choices] input[value="1"]').check();await host.locator('[data-explorer-reveal]').click();A.match(await host.locator('[data-explorer-feedback]').textContent(),/Revise.*Diffusion crosses the barrier/);
  await host.locator('[data-explorer-choices] input[value="0"]').check();await host.locator('[data-explorer-reveal]').click();A.match(await host.locator('[data-explorer-feedback]').textContent(),/prediction fits/);
  await page.click('[data-explorer-quick-back]');A.equal((await inspect()).explorer.stage,'alveoli');A.equal((await inspect()).explorer.lobe,'left-lower');
  await page.click('[data-breath-view="back"]');await host.locator('[data-explorer-step="0"]').click();await page.waitForTimeout(450);s=await inspect();A.deepEqual(s.camera,original.camera);A.equal(s.selected,original.selected);await host.locator('[data-explorer-source]').selectOption('left-posterior-basal-segment');await host.locator('[data-explorer-reset]').click();s=await inspect();A.deepEqual(s.camera,original.camera);A.equal(s.selected,original.selected);A.equal((await model()).seconds,time);A.equal(s.explorer.stage,'whole');
  for(const width of [390,768,1280]){await page.setViewportSize({width,height:1000});await page.click('[data-text-size]');A.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));const targets=await host.locator('button:visible,select:visible').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().height));A.ok(targets.every(h=>h>=44));await page.click('[data-text-size]');}
  A.equal(await page.locator('.sim-breath-canvas canvas').evaluate(e=>e.style.touchAction),'pan-y');
  await host.locator('[data-explorer-source]').selectOption('left-lateral-basal-segment');for(let i=0;i<6;i++)await page.click('[data-explorer-quick-next]');await page.waitForTimeout(300);await page.click('[data-unload-anatomy]');
  const fallback=page.locator('[data-explorer="text"]');await fallback.waitFor({state:'visible'});A.equal(await page.locator('canvas').count(),0);A.equal(await fallback.getAttribute('data-explorer-stage'),'sacs');A.equal(await fallback.getAttribute('data-explorer-lobe'),'left-lower');A.equal((await model()).seconds,time);
  await fallback.locator('[data-explorer-next]').click();A.equal(await fallback.getAttribute('data-explorer-stage'),'alveoli');A.match(await fallback.locator('[data-explorer-diagram]').textContent(),/Terminal bronchioles.*Alveolar–capillary membrane/);
  A.deepEqual(errors,[]);console.log('PASS explorer browser: lazy geometry, actual named source selection, all distal levels, retained source location/side/lobe, no clock reset, one renderer, exact pre-journey camera/selection restore, prediction feedback, 44px controls, 200% narrow layouts, touch scrolling, source-preserving text fallback.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
