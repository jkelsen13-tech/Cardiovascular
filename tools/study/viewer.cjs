const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium,webkit}=require('playwright');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((req,res)=>{const p=path.resolve(root,'.'+(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!p.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(p,(err,data)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':p.endsWith('.jpg')?'image/jpeg':p.endsWith('.png')?'image/png':'text/html');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
for(const [name,type] of [['chromium',chromium],['webkit',webkit]]){const browser=await type.launch();try{const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(url);await page.evaluate(()=>{launch([BANK[94]],'Image controls');chooseAnswer(session.questions[0].answer);});
await page.locator('#qfeedback .study-media summary').click();await page.locator('#qfeedback .study-zoom').filter({hasText:'Enlarge image'}).click();
const dialog=page.locator('dialog.image-viewer'),stage=dialog.locator('.iv-stage'),im=stage.locator('img');
await page.waitForFunction(()=>document.querySelector('dialog.image-viewer').dataset.scale);
async function fitCheck(){const b=await stage.boundingBox(),i=await im.boundingBox();assert(i.width<=b.width+1&&i.height<=b.height+1);assert(i.x>=b.x-1&&i.y>=b.y-1);assert(Math.abs(i.width/i.height-(await im.evaluate(i=>i.naturalWidth/i.naturalHeight)))<.01);}
await fitCheck();const fit=Number(await dialog.getAttribute('data-scale'));
await dialog.getByRole('button',{name:'Zoom in',exact:true}).click();assert(Number(await dialog.getAttribute('data-scale'))>fit);
await dialog.getByRole('button',{name:'Zoom out',exact:true}).click();assert(Math.abs(Number(await dialog.getAttribute('data-scale'))-fit)<.001);
await dialog.getByRole('button',{name:'100%',exact:true}).click();assert.equal(Number(await dialog.getAttribute('data-scale')),1);
if(name==='chromium'){
 await dialog.getByRole('button',{name:'Fit to screen',exact:true}).click();
 const b=await stage.boundingBox(),cdp=await context.newCDPSession(page),cy=b.y+b.height/2,cx=b.x+b.width/2;
 const pts=(n)=>[{id:1,x:cx-n,y:cy},{id:2,x:cx+n,y:cy}];
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:pts(40)});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:pts(80)});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 assert(Number(await dialog.getAttribute('data-scale'))>fit*1.5,'native two-finger pinch zooms');
 await dialog.getByRole('button',{name:'100%',exact:true}).click();
 const old=await im.boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:cx,y:cy}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:cx-60,y:cy-30}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});const moved=await im.boundingBox();assert(moved.x<old.x-20,'one-finger pan');
}
await dialog.getByRole('button',{name:'Fit to screen',exact:true}).click();await fitCheck();
if(name==='webkit')console.log('VIEWER_SCREENSHOT='+(await page.screenshot({type:'jpeg',quality:65})).toString('base64'));
await page.setViewportSize({width:844,height:390});await page.waitForTimeout(100);await fitCheck();const close=await dialog.getByRole('button',{name:'Close image',exact:true}).boundingBox();assert(close.y>=0&&close.y+close.height<390);
await dialog.getByRole('button',{name:'Close image',exact:true}).click();await dialog.waitFor({state:'detached'});assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
assert(await page.locator('#qfeedback .study-zoom').filter({hasText:'Enlarge image'}).evaluate(e=>e===document.activeElement));
await page.goto(url+'/cmt-quiz.html');await page.evaluate(()=>ASPT.open());await page.locator('.aspt-lesson-list [data-id="waves"]').click();await page.locator('#asptLesson [data-action="zoom"][data-id="g03"]').click();await page.waitForFunction(()=>document.querySelector('dialog.image-viewer').dataset.scale);await fitCheck();
await stage.focus();await page.keyboard.press('+');assert((await dialog.getAttribute('data-fit'))==='false');await page.keyboard.press('f');await fitCheck();await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
await page.route('**/study/images/v016.jpg',r=>r.abort());await page.evaluate(()=>ImageViewer.open('study/images/v016.jpg','Vessel example'));await dialog.locator('.iv-error').waitFor({state:'visible'});await page.unroute('**/study/images/v016.jpg');await dialog.getByRole('button',{name:'Retry image',exact:true}).click();await page.waitForFunction(()=>document.querySelector('dialog.image-viewer').dataset.scale);await fitCheck();await dialog.getByRole('button',{name:'Close image',exact:true}).click();await dialog.waitFor({state:'detached'});
assert.deepEqual(errors,[]);console.log('PASS '+name+': fit, zoom buttons, original proportions, rotation, close/focus, keyboard, both viewers and image retry'+(name==='chromium'?', native touch pinch and pan':''));
}finally{await browser.close();}}})().then(()=>server.close()).catch(e=>{console.error(e);server.close();process.exitCode=1;});
