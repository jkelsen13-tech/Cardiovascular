/* Real Chromium UI checks; accepts BASE_URL and can inject the additive module before entry HTML lands. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1024,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.BASE_URL||'http://127.0.0.1:8765/';const evidence=path.resolve('review-heart-v3');fs.mkdirSync(evidence,{recursive:true});
 try{
 await page.goto(base);await page.evaluate(()=>{localStorage.setItem('heart-v3-untouched-sentinel','original');localStorage.setItem('cmt.simulators.progress.sentinel','preserve');});
 if(!await page.locator('#heartV3Launch').count()){await page.addStyleTag({url:new URL('heart-study-v3/module.css',base).href});await page.addScriptTag({url:new URL('heart-study-v3/module.js',base).href});}
 await page.locator('#heartV3Launch').click();await page.waitForFunction(()=>!!window.HeartV3Study?.getModel());
 await page.waitForFunction(()=>window.HeartV3Study.inspect().renderer||window.HeartV3Study.getState().fallback,{timeout:30000});await page.locator('[data-h3-action="inspector"]').click();
 console.log('initial',await page.evaluate(()=>({state:HeartV3Study.getState(),renderer:HeartV3Study.inspect().renderer})).then(x=>({active:x.state.active,fallback:x.state.fallback,triangles:x.renderer?.triangles,drawCalls:x.renderer?.drawCalls})));
 assert.equal(await page.locator('#heartV3Study .h3-data [data-h3-plot]').count(),6);
 for(const phase of ['isovolumetric-contraction','isovolumetric-relaxation']){
  await page.locator(`[data-h3-phase="${phase}"]`).click();const s=await page.evaluate(()=>HeartV3Study.getState());assert.equal(s.sample.leftPhase,phase);assert.equal(s.sample.valves.mitral.open,false);assert.equal(s.sample.valves.aortic.open,false);assert.equal(s.sample.valves.aortic.flow,0);assert.equal(s.playing,false);
 }
 await page.locator('[data-h3-scrub]').evaluate(el=>{el.value='.36';el.dispatchEvent(new Event('input',{bubbles:true}));});assert.equal(await page.evaluate(()=>HeartV3Study.getState().time),.36);
 await page.locator('[data-h3-mode="cutaway"]').click();await page.locator('[data-h3-select]').selectOption('mitral');
 await page.screenshot({path:path.join(evidence,'gross-cutaway-1024.png'),fullPage:true});
 const original=await page.evaluate(()=>HeartV3Study.getState().time);await page.locator('[data-h3-action="play"]').click();await page.waitForTimeout(1000);await page.locator('[data-h3-action="play"]').click();const elapsed=await page.evaluate(()=>HeartV3Study.getState().time);assert(elapsed-original>.6&&elapsed-original<2.5,'elapsed physiological time at 1x');
 await page.evaluate(()=>HeartV3Study.changeParameters({heartRate:100}));assert.equal(await page.evaluate(()=>HeartV3Study.getModel().period),.6);
 await page.locator('[data-h3-phase="isovolumetric-contraction"]').click();const paused=await page.evaluate(()=>HeartV3Study.getState().time);await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>HeartV3Study.getState().time),paused);
 await page.locator('[data-h3-rotation]').check();await page.locator('.heart-v3-canvas').focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('+');assert.equal(await page.evaluate(()=>HeartV3Study.getState().time),paused,'canvas rotation does not phase-step');const snap=await page.evaluate(()=>HeartV3Study.inspect().camera);
 await page.locator('[data-h3-action="fallback"]').click();assert.equal(await page.evaluate(()=>HeartV3Study.getState().fallback),true);assert.equal(await page.evaluate(()=>HeartV3Study.getState().time),paused);
 await page.locator('[data-h3-action="retry"]').click();await page.waitForFunction(()=>!!HeartV3Study.inspect().renderer);assert.deepEqual(await page.evaluate(()=>HeartV3Study.inspect().camera),snap);
 for(const width of [390,768,1024]){await page.setViewportSize({width,height:900});await page.locator('[data-h3-text-size]').selectOption('2');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow '+width);await page.screenshot({path:path.join(evidence,`text200-${width}.png`),fullPage:true});}
 await page.locator('[data-h3-text-size]').selectOption('1');await page.locator('[data-h3-analysis]>summary').click();assert.equal(await page.locator('.h3-data [data-h3-plot]:visible').count(),6);
 const marker=page.locator('[data-h3-plot="volume"] [data-h3-marker]');const pathBefore=await page.locator('[data-h3-plot="volume"] .h3-curve').first().getAttribute('d');await page.evaluate(()=>HeartV3Study.seek(.4));assert.equal(await page.locator('[data-h3-plot="volume"] .h3-curve').first().getAttribute('d'),pathBefore);assert(await marker.getAttribute('x1'));
 await page.locator('[data-h3-action="independent"]').click();await page.locator('[data-h3-action="guided"]').click();assert.equal(await page.evaluate(()=>HeartV3Study.inspect().progress.attempts.length),2);
 await page.locator('.h3-progress summary').click();const saved=await page.evaluate(()=>localStorage.getItem('cmt.heart.v3.progress.v1'));await page.locator('[data-h3-import]').fill('{"version":1}');await page.locator('[data-h3-action="import"]').click();assert.equal(await page.evaluate(()=>localStorage.getItem('cmt.heart.v3.progress.v1')),saved);
 await page.locator('[data-h3-action="home"]').click();assert.equal(await page.evaluate(()=>HeartV3Study.inspect().rafRunning),false);assert.equal(await page.locator('.heart-v3-canvas').count(),0);
 await page.locator('#heartV3Launch').click();await page.waitForFunction(()=>!!HeartV3Study.inspect().renderer);assert.equal(await page.evaluate(()=>HeartV3Study.getState().parameters.heartRate),100);assert.equal(await page.evaluate(()=>localStorage.getItem('heart-v3-untouched-sentinel')),'original');
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(evidence,'ui-result.json'),JSON.stringify({passed:true,checks:['phase states and zero iso outflow','same-model six plots','1x elapsed clock','100bpm period','paused time','camera restoration through 3D-text-3D','390/768/1024 200% text','curve paths stable during seek','guided/independent storage and invalid import','no inactive renderer','sentinel preservation'],inspection:await page.evaluate(()=>HeartV3Study.inspect()),errors},null,2));console.log('Heart v3 real-browser UI checks passed');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
