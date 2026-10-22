/* Accessible, explicit supplemental content. No substitute anatomical model. */
(function(root){
 'use strict';
 const home=document.getElementById('home'),menu=document.getElementById('homeMenu');
 const panel=document.createElement('section');panel.id='guidedExplanationStudy';panel.className='hidden sim-card';
 const tag=document.createElement('p');tag.className='sim-badge';tag.textContent='Supplemental explanation · no corresponding 3D or numerical process';
 const heading=document.createElement('h2'),text=document.createElement('p'),qualification=document.createElement('p'),source=document.createElement('p'),back=document.createElement('button');
 const figure=document.createElement('figure'),image=document.createElement('img'),caption=document.createElement('figcaption');figure.hidden=true;image.style.maxWidth='100%';image.style.height='auto';image.decoding='async';figure.append(image,caption);
 const retainedStrips=new Map([
  ['ecg/images/a6d28f.png','06cb93b6c931a3b3e3fd93ea779b21271914614c8f4bece67539f5a309807c7d'],
  ['ecg/images/b9e407.png','475f4a18e91f79c5138ad3453d9e9fc8a6f720ad8ea8d136589c26efe0454f75'],
  ['ecg/images/c2f861.png','5f52392deace7ec98a05c1b6633bda791aca61ef636fc8fafcbbada074c898e6'],
  ['ecg/images/d7a350.png','1ceac21f4293b94a48066f3229a4d33ee11d47cefbf021db6e83aec4150b4928'],
  ['ecg/images/e4b916.png','9530f3aa3edea12cc1668c1d750caf70ef7aaeed286566ac695258d96129c1df'],
  ['ecg/images/f8c205.png','75c06f514351fbcfa545b3fb320caa623ba5fd0746a6bf1f4846246b74b444a4'],
  ['ecg/images/k8a473.png','14277ad1e7e78ef3bfb24566f9a09075244ddabf02c693c8c4dc1948e2553408'],
  ['ecg/images/m2b695.png','564b1ffd01550873f2084a15683295647bf037a27972e4725f594257e22d01ed'],
  ['ecg/images/n6c048.png','34d704a29a4b926d8c99a796af9d0c28153adf1fe802b879b4095ce90a5cfc2c'],
  ['ecg/images/p4d827.png','9b38afd840b3fcf2dc8a9aa1f24e5a08166c94eab16bd0235ab957766a56c52a'],
  ['ecg/images/g3d782.png','1100e00a27e72e2f1c9a814c1c2e6050eb575e40082f752dba0014b981ec0a73'],
  ['ecg/images/h5e139.png','74b6934dc06107e6483cb9bf0a6377b7f63a270bc288c0f896e7eef9b30aa997'],
  ['ecg/images/j1f624.png','f0b05fd90fbea0d6adbf64459aed2e052f69d4a63039ff867cf8662dc0efc23d']
 ]);
 heading.tabIndex=-1;text.style.whiteSpace='pre-wrap';qualification.className=source.className='gs-note';back.type='button';back.textContent='All study modes';back.style.minHeight='44px';back.onclick=()=>root.goHome();panel.append(tag,heading,text,figure,qualification,source,back);home.append(panel);
 let current=null,signature=null;
 const clone=v=>JSON.parse(JSON.stringify(v)),owns=ctx=>!ctx||ctx.isCurrent();
 const oldHome=root.goHome;root.goHome=function(){panel.classList.add('hidden');return oldHome.apply(this,arguments);};
 async function prepare(scene,ctx){if(!owns(ctx))return false;const suspended=root.CardiorespiratoryStudy?.guided.suspendForExplanation?.(ctx);if(!owns(ctx))return false;if(!suspended)root.goHome();if(!owns(ctx))return false;menu.classList.add('hidden');panel.classList.remove('hidden');return true;}
 async function apply(scene,time,ctx){if(!owns(ctx))return false;if(!scene||scene.organ!=='explanation'||!scene.title||!scene.text)throw Error('Supplemental content is unavailable.');const key=JSON.stringify(scene);if(key!==signature){const strip=scene.illustration;if(strip&&(!retainedStrips.has(strip.src)||retainedStrips.get(strip.src)!==strip.sha256||typeof strip.alt!=='string'||!strip.alt||!strip.source||!strip.qualification))throw Error('This lesson strip is not a verified retained course asset.');heading.textContent=scene.title;text.textContent=scene.text;qualification.textContent=scene.qualification||'Readable course explanation. No anatomical highlight, measured process or clinical prediction is represented.';source.textContent=typeof scene.source==='string'?scene.source:'Owner-approved adapted narration; source details in the lesson transcript.';figure.hidden=!strip;if(strip){image.src=strip.src;image.alt=strip.alt;caption.textContent=strip.source+' · '+strip.qualification;}else{image.removeAttribute('src');image.alt='';caption.textContent='';}current=clone(scene);signature=key;}return true;}
 root.GuidedExplanation={prepare,apply,hide(ctx){if(!owns(ctx))return false;panel.classList.add('hidden');return true;},capture:()=>({version:1,scene:current&&clone(current)}),async restore(saved,ctx){if(saved?.version!==1||!saved.scene)throw Error('Saved supplemental scene is unavailable.');if(!await prepare(saved.scene,ctx)||!owns(ctx))return false;return apply(saved.scene,0,ctx);},pause(){},inspect:()=>({visible:!panel.classList.contains('hidden'),scene:current&&clone(current)})};
})(window);
