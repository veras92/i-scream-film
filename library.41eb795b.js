!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequired7c6=i),i("4Nugj");var a=i("bpxeT"),u=i("2TvXO"),l=i("cokon"),o=i("gQOBw"),c=i("9Vqzl"),s=i("flcv8"),f=i("4Nugj"),d=i("kvC6y"),p=i("eY4ce");window.addEventListener("load",(function(){f.refs.list.innerHTML='<li class="library-title-item"><h2 class="library-title-main">Welcome to your library</h2></li>'}));var h=document.querySelector(".js-watched-button"),v=document.querySelector(".js-queue-button");function y(){return(y=e(a)(e(u).mark((function t(n,r){var i,a,o,c,s;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,d.showLoader)(),i=(0,l.getDatabase)(p.app),a=(0,l.ref)(i,"".concat(n,"/").concat(r)),e.next=6,(0,l.get)(a);case 6:if(o=e.sent,c=o.val(),"watched"===r&&(c||(f.refs.list.innerHTML='<li class="library-title-item"><h2 class="library-title-main">You have nothing on your watch list</h2></li>')),"queue"===r&&(c||(f.refs.list.innerHTML='<li class="library-title-item"><h2 class="library-title-main">There is nothing in the queue</h2></li>')),!c){e.next=16;break}return b(s=Object.values(c)),e.abrupt("return",s);case 16:return e.abrupt("return",[]);case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0),console.error(e.t0);case 22:return e.prev=22,(0,d.hideLoader)(),e.finish(22);case 25:case"end":return e.stop()}}),t,null,[[0,19,22,25]])})))).apply(this,arguments)}function b(e){return w.apply(this,arguments)}function w(){return(w=e(a)(e(u).mark((function t(n){var r,i;return e(u).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new(0,c.FimlsApi),e.next=3,Promise.all(n.map((function(e){return r.getFilmById(e)})));case 3:i=e.sent,m((0,s.createHomepageCards)(i));case 6:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function m(e){f.refs.list.innerHTML=e}function g(e){(0,o.getAuth)().onAuthStateChanged((function(t){t&&function(e,t){y.apply(this,arguments)}(t.uid,e)}))}h.addEventListener("click",(function(){g("watched")})),v.addEventListener("click",(function(){g("queue")})),i("puS1k"),i("kWfXz"),i("fYPNS"),i("flcv8"),i("9Vqzl"),i("kvC6y"),i("iNWLi"),i("5UNtS"),i("eY4ce"),i("6VMVE")}();
//# sourceMappingURL=library.41eb795b.js.map