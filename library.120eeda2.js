var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in i){var n=i[e];delete i[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},e.parcelRequired7c6=n),n("krGWQ");var a=n("jAzyG"),o=n("eyjy7"),r=n("cEmXr"),c=n("6meQU"),l=n("cjo0G"),s=n("krGWQ"),u=n("gjiCh");const d=r.default.initializeApp({apiKey:"AIzaSyA8HI-hGo7_WkrdYi4nAbp8aOc6TTRuWvY",authDomain:"filmoteka-c3101.firebaseapp.com",projectId:"filmoteka-c3101",storageBucket:"filmoteka-c3101.appspot.com",messagingSenderId:"990735444623",appId:"1:990735444623:web:5585f899cc012270841efa",databaseURL:"https://filmoteka-c3101-default-rtdb.firebaseio.com"}),f=document.querySelector(".js-watched-button"),h=document.querySelector(".js-queue-button");async function p(e,t){try{(0,u.showLoader)();const i=(0,a.getDatabase)(d),n=(0,a.ref)(i,`${e}/${t}`),o=(await(0,a.get)(n)).val();if("watched"===t&&(o||(s.refs.list.innerHTML='<li><h2 class="library-title-main">You have nothing on your watch list</h2></li>')),"queue"===t&&(o||(s.refs.list.innerHTML='<li><h2 class="library-title-main">There is nothing in the queue</h2></li>')),o){const e=Object.values(o);return async function(e){const t=new(0,c.FimlsApi),i=await Promise.all(e.map((e=>t.getFilmById(e))));!function(e){s.refs.list.innerHTML=e}((0,l.createHomepageCards)(i))}(e),e}return[]}catch(e){console.error(e)}finally{(0,u.hideLoader)()}}function m(e){(0,o.getAuth)().onAuthStateChanged((t=>{if(t){p(t.uid,e)}}))}f.addEventListener("click",(function(){m("watched")})),h.addEventListener("click",(function(){m("queue")})),n("hR8LQ"),n("iJVjY"),n("eeP4j"),n("cjo0G"),n("6meQU"),n("gjiCh"),n("2ix2C");
//# sourceMappingURL=library.120eeda2.js.map
