/* Small CPU tree for the actual overview controller. It parses its fixed HTML/SVG
 * scaffold and serializes live nodes; no canned markup or production fallback.
 * Browser DOM/rendering remains a separate integration requirement.
 */
'use strict';
const escapeText=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const decode=s=>s.replace(/&(amp|lt|gt|quot|#39);/g,(_,n)=>({amp:'&',lt:'<',gt:'>',quot:'"','#39':"'"}[n]));
const voids=new Set(['br','hr','img','input','meta','link']);
class Node{
 constructor(doc){this.ownerDocument=doc;this.parentNode=null;}
 get nextSibling(){return this.parentNode?.childNodes[this.parentNode.childNodes.indexOf(this)+1]||null;}
 remove(){if(this.parentNode){const p=this.parentNode;p.childNodes.splice(p.childNodes.indexOf(this),1);this.parentNode=null;this.ownerDocument.writes++;}}
}
class Text extends Node{
 constructor(doc,value){super(doc);this.value=value;this.nodeType=3;}
 get textContent(){return this.value;}
 set textContent(value){this.value=String(value);this.ownerDocument.writes++;}
 get outerHTML(){return escapeText(this.value);}
}
class Element extends Node{
 constructor(doc,tag){super(doc);this.tagName=tag;this.nodeType=1;this.attributes=new Map();this.childNodes=[];this.innerHTMLWrites=0;this.hidden=false;this.dataset=new Proxy({},{get:(_,key)=>this.getAttribute('data-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())),set:(_,key,v)=>{this.setAttribute('data-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),v);return true;}});}
 get firstChild(){return this.childNodes[0]||null;}
 get lastChild(){return this.childNodes.at(-1)||null;}
 get children(){return this.childNodes.filter(n=>n.nodeType===1);}
 appendChild(node){node.remove();node.parentNode=this;this.childNodes.push(node);this.ownerDocument.writes++;return node;}
 getAttribute(key){return this.attributes.get(key)??null;}
 hasAttribute(key){return this.attributes.has(key);}
 setAttribute(key,value){this.attributes.set(key,String(value));this.ownerDocument.writes++;}
 removeAttribute(key){this.attributes.delete(key);this.ownerDocument.writes++;}
 set className(v){this.setAttribute('class',v);}
 get className(){return this.getAttribute('class')||'';}
 get textContent(){return this.childNodes.map(n=>n.textContent).join('');}
 set textContent(v){for(const c of this.childNodes)c.parentNode=null;this.childNodes=[];if(v!=='')this.appendChild(new Text(this.ownerDocument,String(v)));this.ownerDocument.writes++;}
 matches(selector){if(selector[0]==='.')return this.className.split(/\s+/).includes(selector.slice(1));const a=selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);return a?this.hasAttribute(a[1])&&(a[2]===undefined||this.getAttribute(a[1])===a[2]):this.tagName.toLowerCase()===selector.toLowerCase();}
 querySelectorAll(selector){const result=[];for(const c of this.children){if(c.matches(selector))result.push(c);result.push(...c.querySelectorAll(selector));}return result;}
 querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
 get innerHTML(){return this.childNodes.map(n=>n.outerHTML).join('');}
 set innerHTML(html){this.innerHTMLWrites++;for(const c of this.childNodes)c.parentNode=null;this.childNodes=[];const stack=[this];for(const token of String(html).match(/<[^>]*>|[^<]+/g)||[]){if(token.startsWith('</')){const tag=token.slice(2,-1).trim().toLowerCase();if(stack.at(-1).tagName.toLowerCase()!==tag)throw Error('Unbalanced fixed scaffold: '+token);stack.pop();}else if(token[0]==='<'){const match=token.match(/^<([\w:-]+)([\s\S]*?)\/?\s*>$/);if(!match)throw Error('Unknown fixed scaffold token '+token);const node=this.ownerDocument.createElement(match[1]);for(const a of match[2].matchAll(/([^\s=]+)\s*=\s*"([^"]*)"/g))node.setAttribute(a[1],decode(a[2]));stack.at(-1).appendChild(node);if(!token.endsWith('/>')&&!voids.has(match[1].toLowerCase()))stack.push(node);}else stack.at(-1).appendChild(new Text(this.ownerDocument,decode(token)));}if(stack.length!==1)throw Error('Unclosed fixed scaffold nodes');}
 get outerHTML(){return '<'+this.tagName+Array.from(this.attributes,([k,v])=>' '+k+'="'+escapeText(v).replace(/"/g,'&quot;')+'"').join('')+'>'+this.innerHTML+(voids.has(this.tagName.toLowerCase())?'':'</'+this.tagName+'>');}
}
class Document{
 constructor(){this.writes=0;}
 createElement(tag){return new Element(this,tag);}
}
module.exports={Document};
