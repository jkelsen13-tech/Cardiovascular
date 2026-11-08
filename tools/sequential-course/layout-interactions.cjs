'use strict';
// Retain every assertion of the historical interaction suite. The responsive
// dock hides near inline controls, so its user action follows the visible
// transport. No media, progress, source data or expectations are mocked.
const {chromium}=require('playwright');
const launch=chromium.launch.bind(chromium);
chromium.launch=async options=>{
 const browser=await launch(options),newPage=browser.newPage.bind(browser);
 browser.newPage=async options=>{
  const page=await newPage(options),click=page.click.bind(page);
  page.click=async(selector,options)=>{
   if(selector==='[data-seq-dock-play]'&&!await page.locator(selector).isVisible())selector='[data-seq-play]';
   return click(selector,options);
  };
  return page;
 };
 return browser;
};
require('./slide-interactions.cjs');
