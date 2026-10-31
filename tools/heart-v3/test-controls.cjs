/* Test navigation prerequisite for native presentation disclosures.
   Opens only ancestor <details> before a user interaction. Does not alter
   styles, model state, media, selectors or assertions; missing controls fail. */
const prepared=new WeakSet();
function presentationControls(page){
 if(prepared.has(page))return;prepared.add(page);
 const open=async locator=>locator.evaluate(node=>{for(let p=node.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;});
 const locate=page.locator.bind(page);
 page.locator=(selector,...rest)=>{const locator=locate(selector,...rest);if(typeof selector==='string'&&selector.includes('data-h3-'))for(const action of ['click','tap','check','uncheck','selectOption','fill']){const invoke=locator[action].bind(locator);locator[action]=async(...args)=>{await open(locator);return invoke(...args);};}return locator;};
 for(const action of ['click','tap','check','uncheck','selectOption','fill']){const invoke=page[action].bind(page);page[action]=async(selector,...args)=>{if(typeof selector==='string'&&selector.includes('data-h3-'))await open(locate(selector));return invoke(selector,...args);};}
}
module.exports={presentationControls};
