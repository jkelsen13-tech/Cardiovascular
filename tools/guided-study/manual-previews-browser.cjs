'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const out=process.env.GUIDED_PREVIEW_OUT;
if(out)fs.mkdirSync(out,{recursive:true});
(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:1100}}),errors=[],records=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.CARDIO_BASE_URL||'http://127.0.0.1:8866/');
    const options=selector=>page.locator(selector+' option').evaluateAll(list=>list.filter(o=>o.value).map(o=>({id:o.value,disabled:o.disabled})));
    const recorded=await options('[data-guided-lesson]'),previews=await options('[data-guided-preview]');
    assert.equal(recorded.length,111);assert.equal(new Set(recorded.map(o=>o.id)).size,111);assert(recorded.every(o=>!o.disabled));
    assert.deepEqual(previews.map(o=>o.id).sort(),['E.preview','R.preview']);assert(previews.every(o=>!o.disabled));
    const idle=()=>page.waitForFunction(()=>!GuidedStudy.session.inspect().busy);
    for(const id of ['E.preview','R.preview']){
      await page.selectOption('[data-guided-preview]',id);await idle();
      const initial=await page.evaluate(()=>({session:GuidedStudy.session.inspect(),paused:GuidedStudy.audio.paused}));
      assert.equal(initial.session.lessonId,id);assert.equal(initial.session.playable,false);assert.equal(initial.session.playing,false);assert(initial.paused);
      assert(await page.locator('[data-guided-action="play"]').isDisabled());assert.equal(await page.locator('[data-guided-lesson]').inputValue(),'');
      await page.click('[data-guided-action="next"]');await idle();
      const next=await page.evaluate(()=>GuidedStudy.session.inspect());assert.equal(next.lessonId,id);assert(next.cueIndex>initial.session.cueIndex);assert.equal(next.playing,false);
      records.push({id,initial,next});
    }
    await page.reload();
    assert.equal(await page.locator('[data-guided-preview]').inputValue(),'R.preview');
    assert(await page.locator('[data-guided-action="play"]').isDisabled());
    await page.click('[data-guided-action="guided"]');await idle();
    assert.equal((await page.evaluate(()=>GuidedStudy.session.inspect())).lessonId,'R.preview');
    await page.selectOption('[data-guided-lesson]','M05.06');await idle();
    assert.equal(await page.locator('[data-guided-preview]').inputValue(),'');
    const audio=await page.evaluate(()=>({state:GuidedStudy.session.inspect(),paused:GuidedStudy.audio.paused,ready:GuidedStudy.audio.readyState}));
    assert.equal(audio.state.lessonId,'M05.06');assert(audio.state.playable);assert(audio.paused);assert(audio.ready>=1);
    assert(await page.locator('[data-guided-action="play"]').isEnabled());assert.deepEqual(errors,[]);
    if(out){await page.locator('#guidedStudyPlayer').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'separate-recorded-lessons-and-manual-previews.png')});fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({passed:true,recordedCount:recorded.length,previews,records,audio,errors,qualification:'Both manual previews remain available without audio; recorded lessons keep the original 111-options assertion. Cloud browser only.'},null,2)+'\n');}
    console.log('PASS 111 recorded options, both manual previews, manual scene navigation/reload, paused recorded return and no page errors.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
