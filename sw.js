if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const c=e=>n(e,d),t={module:{uri:d},exports:o,require:c};i[d]=Promise.all(r.map((e=>t[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-ChQrtWqQ.css",revision:null},{url:"assets/index-CjRITVzJ.js",revision:null},{url:"index.html",revision:"55690312a07630d2f187518ee16be0f0"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"cf78bb93591a44304f26bcbcdb77b01d"},{url:"apple-touch-icon.png",revision:"572643b12540b483176012de515e5225"},{url:"pwa-192x192.png",revision:"96d8dd4ca0e38dd1e51eca41e1b366e9"},{url:"pwa-512x512.png",revision:"9f07064bedaa0c2a25d8f9ee521cd505"},{url:"pwa-maskable-192x192.png",revision:"d72ee83fe1da074db1dc68ff8fb90f11"},{url:"pwa-maskable-512x512.png",revision:"ee694d1fa38fe323283c90bcc11eba0d"},{url:"manifest.webmanifest",revision:"e8c2fbcb6b9a0e2ea41d6bdca212a46d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
