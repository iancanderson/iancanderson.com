(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[922],{3905:function(e,t,n){"use strict";n.r(t),n.d(t,{MDXContext:function(){return s},MDXProvider:function(){return f},mdx:function(){return h},useMDXComponents:function(){return d},withMDXComponents:function(){return u}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),u=function(e){return function(t){var n=d(t.components);return r.createElement(e,o({},t,{components:n}))}},d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"===typeof e?e(t):c(c({},t),e)),n},f=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,a=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=d(n),f=i,p=u["".concat(a,".").concat(f)]||u[f]||m[f]||o;return n?r.createElement(p,c(c({ref:t},s),{},{components:n})):r.createElement(p,c({ref:t},s))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"===typeof e||i){var o=n.length,a=new Array(o);a[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"===typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},8093:function(e,t,n){"use strict";var r=n(7294),i=n(3905);function o(e){return e&&"object"===typeof e&&"default"in e?e:{default:e}}function a(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var c=o(r),l=a(i);"undefined"!==typeof window&&(window.requestIdleCallback=window.requestIdleCallback||function(e){var t=Date.now();return setTimeout((function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})}),1)},window.cancelIdleCallback=window.cancelIdleCallback||function(e){clearTimeout(e)}),t.R=function({compiledSource:e,scope:t,components:n={},lazy:i}){const[o,a]=r.useState(!i||"undefined"===typeof window);r.useEffect((()=>{if(i){const e=window.requestIdleCallback((()=>{a(!0)}));return()=>window.cancelIdleCallback(e)}}),[]);const s=r.useMemo((()=>{const n=Object.assign({mdx:l.mdx,React:c.default},t),r=Object.keys(n),i=Object.values(n),o=Reflect.construct(Function,r.concat(`${e}; return MDXContent;`));return o.apply(o,i)}),[t,e]);if(!o)return c.default.createElement("div",{dangerouslySetInnerHTML:{__html:""},suppressHydrationWarning:!0});const u=c.default.createElement(l.MDXProvider,{components:n},c.default.createElement(s,null));return i?c.default.createElement("div",null,u):u}},3454:function(e,t,n){"use strict";var r,i;e.exports=(null===(r=n.g.process)||void 0===r?void 0:r.env)&&"object"===typeof(null===(i=n.g.process)||void 0===i?void 0:i.env)?n.g.process:n(7663)},9035:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[slug]",function(){return n(3148)}])},7518:function(e,t,n){"use strict";var r=n(5893);t.Z=function(e){var t=e.children;return(0,r.jsx)("div",{className:"container mx-auto px-5",children:t})}},3797:function(e,t,n){"use strict";var r=n(5893),i=n(3855),o=n(4797);t.Z=function(e){var t=e.dateString,n=(0,i.Z)(t);return(0,r.jsx)("time",{dateTime:t,children:(0,o.Z)(n,"LLLL\td, yyyy")})}},6930:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(5893),i=n(7518);var o=function(e){e=null!==e?e:function(e){throw e}(new TypeError("Cannot destructure undefined"));return(0,r.jsx)("div",{className:"border-b bg-neutral-800 border-neutral-800 text-white",children:(0,r.jsx)(i.Z,{children:(0,r.jsx)("div",{className:"py-2 text-center text-sm",children:(0,r.jsxs)(r.Fragment,{children:["This page is a preview."," ",(0,r.jsx)("a",{href:"/api/exit-preview",className:"underline hover:text-teal-300 duration-200 transition-colors",children:"Click here"})," ","to exit preview mode."]})})})})},a=function(){return(0,r.jsx)("footer",{className:"bg-neutral-50 border-t border-neutral-200",children:(0,r.jsx)(i.Z,{})})},c=n(9008),l=function(){return(0,r.jsxs)(c.default,{children:[(0,r.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/favicon/apple-touch-icon.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon/favicon-32x32.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon/favicon-16x16.png"}),(0,r.jsx)("link",{rel:"manifest",href:"/favicon/site.webmanifest"}),(0,r.jsx)("link",{rel:"mask-icon",href:"/favicon/safari-pinned-tab.svg",color:"#000000"}),(0,r.jsx)("link",{rel:"shortcut icon",href:"/favicon/favicon.ico"}),(0,r.jsx)("meta",{name:"msapplication-TileColor",content:"#000000"}),(0,r.jsx)("meta",{name:"msapplication-config",content:"/favicon/browserconfig.xml"}),(0,r.jsx)("meta",{name:"theme-color",content:"#000"}),(0,r.jsx)("link",{rel:"alternate",type:"application/rss+xml",href:"/feed.xml"}),(0,r.jsx)("meta",{name:"description",content:"Ian C. Anderson's website"}),(0,r.jsx)("meta",{property:"og:image",content:"https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg"}),(0,r.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/themes/prism.min.css"})]})},s=function(e){var t=e.preview,n=e.children;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l,{}),(0,r.jsxs)("div",{className:"min-h-screen",children:[t&&(0,r.jsx)(o,{}),(0,r.jsx)("main",{children:n})]}),(0,r.jsx)(a,{})]})}},8045:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);a=!0);}catch(l){c=!0,i=l}finally{try{a||null==n.return||n.return()}finally{if(c)throw i}}return o}}(e,t)||c(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||c(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}t.default=function(e){var t,n=e.src,r=e.sizes,a=e.unoptimized,c=void 0!==a&&a,l=e.priority,d=void 0!==l&&l,m=e.loading,g=e.lazyRoot,v=void 0===g?null:g,b=e.lazyBoundary,w=void 0===b?"200px":b,x=e.className,j=e.quality,O=e.width,A=e.height,P=e.objectFit,_=e.objectPosition,z=e.onLoadingComplete,T=e.loader,I=void 0===T?S:T,N=e.placeholder,D=void 0===N?"empty":N,C=e.blurDataURL,L=function(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}(e,["src","sizes","unoptimized","priority","loading","lazyRoot","lazyBoundary","className","quality","width","height","objectFit","objectPosition","onLoadingComplete","loader","placeholder","blurDataURL"]),R=s.useRef(null),F=L,M=r?"responsive":"intrinsic";"layout"in F&&(F.layout&&(M=F.layout),delete F.layout);var q="";if(function(e){return"object"===typeof e&&(y(e)||function(e){return void 0!==e.src}(e))}(n)){var W=y(n)?n.default:n;if(!W.src)throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(W)));if(C=C||W.blurDataURL,q=W.src,(!M||"fill"!==M)&&(A=A||W.height,O=O||W.width,!W.height||!W.width))throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(W)))}n="string"===typeof n?n:q;var Z=E(O),X=E(A),B=E(j),H=!d&&("lazy"===m||"undefined"===typeof m);(n.startsWith("data:")||n.startsWith("blob:"))&&(c=!0,H=!1);(null===(t=R.current)||void 0===t?void 0:t.complete)&&(H=!1);0;var U,V=o(f.useIntersection({rootRef:v,rootMargin:w,disabled:!H}),2),G=V[0],J=V[1],$=!H||J,Q={boxSizing:"border-box",display:"block",overflow:"hidden",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},K={boxSizing:"border-box",display:"block",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},Y=!1,ee={position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",padding:0,border:"none",margin:"auto",display:"block",width:0,height:0,minWidth:"100%",maxWidth:"100%",minHeight:"100%",maxHeight:"100%",objectFit:P,objectPosition:_},te="blur"===D?{filter:"blur(20px)",backgroundSize:P||"cover",backgroundImage:'url("'.concat(C,'")'),backgroundPosition:_||"0% 0%"}:{};if("fill"===M)Q.display="block",Q.position="absolute",Q.top=0,Q.left=0,Q.bottom=0,Q.right=0;else if("undefined"!==typeof Z&&"undefined"!==typeof X){var ne=X/Z,re=isNaN(ne)?"100%":"".concat(100*ne,"%");"responsive"===M?(Q.display="block",Q.position="relative",Y=!0,K.paddingTop=re):"intrinsic"===M?(Q.display="inline-block",Q.position="relative",Q.maxWidth="100%",Y=!0,K.maxWidth="100%",U="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 version=%271.1%27 width=%27".concat(Z,"%27 height=%27").concat(X,"%27/%3e")):"fixed"===M&&(Q.display="inline-block",Q.position="relative",Q.width=Z,Q.height=X)}else 0;var ie={src:h,srcSet:void 0,sizes:void 0};$&&(ie=k({src:n,unoptimized:c,layout:M,width:Z,quality:B,sizes:r,loader:I}));var oe=n;0;var ae;0;var ce=(i(ae={},"imagesrcset",ie.srcSet),i(ae,"imagesizes",ie.sizes),ae),le=s.default.useLayoutEffect,se=s.useRef(z);return s.useEffect((function(){se.current=z}),[z]),le((function(){G(R.current)}),[G]),s.useEffect((function(){!function(e,t,n,r,i){var o=function(){var t=e.current;t&&(t.src!==h&&("decode"in t?t.decode():Promise.resolve()).catch((function(){})).then((function(){if(e.current&&("blur"===r&&(t.style.filter="",t.style.backgroundSize="",t.style.backgroundImage="",t.style.backgroundPosition=""),i.current)){var n=t.naturalWidth,o=t.naturalHeight;i.current({naturalWidth:n,naturalHeight:o})}})))};e.current&&(e.current.complete?o():e.current.onload=o)}(R,0,0,D,se)}),[oe,M,D,$]),s.default.createElement("span",{style:Q},Y?s.default.createElement("span",{style:K},U?s.default.createElement("img",{style:{display:"block",maxWidth:"100%",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},alt:"","aria-hidden":!0,src:U}):null):null,s.default.createElement("img",Object.assign({},F,ie,{decoding:"async","data-nimg":M,className:x,ref:R,style:p({},ee,te)})),H&&s.default.createElement("noscript",null,s.default.createElement("img",Object.assign({},F,k({src:n,unoptimized:c,layout:M,width:Z,quality:B,sizes:r,loader:I}),{decoding:"async","data-nimg":M,style:ee,className:x,loading:m||"lazy"}))),d?s.default.createElement(u.default,null,s.default.createElement("link",Object.assign({key:"__nimg-"+ie.src+ie.srcSet+ie.sizes,rel:"preload",as:"image",href:ie.srcSet?void 0:ie.src},ce))):null)};var l,s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294)),u=(l=n(5443))&&l.__esModule?l:{default:l},d=n(5809),f=n(7190);function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){for(var t=arguments,n=function(n){var r=null!=t[n]?t[n]:{},i=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),i.forEach((function(t){m(e,t,r[t])}))},r=1;r<arguments.length;r++)n(r);return e}new Map;var h="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";var g=new Map([["default",function(e){var t=e.root,n=e.src,r=e.width,i=e.quality;0;return"".concat(t,"?url=").concat(encodeURIComponent(n),"&w=").concat(r,"&q=").concat(i||75)}],["imgix",function(e){var t=e.root,n=e.src,r=e.width,i=e.quality,o=new URL("".concat(t).concat(A(n))),a=o.searchParams;a.set("auto",a.get("auto")||"format"),a.set("fit",a.get("fit")||"max"),a.set("w",a.get("w")||r.toString()),i&&a.set("q",i.toString());return o.href}],["cloudinary",function(e){var t=e.root,n=e.src,r=e.width,i=e.quality,o=["f_auto","c_limit","w_"+r,"q_"+(i||"auto")].join(",")+"/";return"".concat(t).concat(o).concat(A(n))}],["akamai",function(e){var t=e.root,n=e.src,r=e.width;return"".concat(t).concat(A(n),"?imwidth=").concat(r)}],["custom",function(e){var t=e.src;throw new Error('Image with src "'.concat(t,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}]]);function y(e){return void 0!==e.default}var v={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image/",loader:"custom"}||d.imageConfigDefault,b=v.deviceSizes,w=v.imageSizes,x=v.loader,j=v.path,O=(v.domains,a(b).concat(a(w)));function k(e){var t=e.src,n=e.unoptimized,r=e.layout,i=e.width,o=e.quality,c=e.sizes,l=e.loader;if(n)return{src:t,srcSet:void 0,sizes:void 0};var s=function(e,t,n){if(n&&("fill"===t||"responsive"===t)){for(var r,i=/(^|\s)(1?\d?\d)vw/g,o=[];r=i.exec(n);r)o.push(parseInt(r[2]));if(o.length){var c,l=.01*(c=Math).min.apply(c,a(o));return{widths:O.filter((function(e){return e>=b[0]*l})),kind:"w"}}return{widths:O,kind:"w"}}return"number"!==typeof e||"fill"===t||"responsive"===t?{widths:b,kind:"w"}:{widths:a(new Set([e,2*e].map((function(e){return O.find((function(t){return t>=e}))||O[O.length-1]})))),kind:"x"}}(i,r,c),u=s.widths,d=s.kind,f=u.length-1;return{sizes:c||"w"!==d?c:"100vw",srcSet:u.map((function(e,n){return"".concat(l({src:t,quality:o,width:e})," ").concat("w"===d?e:n+1).concat(d)})).join(", "),src:l({src:t,quality:o,width:u[f]})}}function E(e){return"number"===typeof e?e:"string"===typeof e?parseInt(e,10):void 0}function S(e){var t=g.get(x);if(t)return t(p({root:j},e));throw new Error('Unknown "loader" found in "next.config.js". Expected: '.concat(d.VALID_LOADERS.join(", "),". Received: ").concat(x))}function A(e){return"/"===e[0]?e.slice(1):e}b.sort((function(e,t){return e-t})),O.sort((function(e,t){return e-t}))},3148:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return E},default:function(){return S}});var r=n(5893),i=n(1163),o=n(2918),a=n(7518),c=n(6834),l=n.n(c),s=function(e){var t=e.children;return(0,r.jsx)("div",{className:"max-w-2xl mx-auto",children:(0,r.jsx)("div",{className:l().markdown,children:t})})},u=n(1664),d=function(){return(0,r.jsxs)("h2",{className:"text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8",children:[(0,r.jsx)(u.default,{href:"/",children:(0,r.jsx)("a",{className:"hover:underline",children:"iancanderson"})}),"."]})},f=n(3797),m=function(e){var t=e.children;return(0,r.jsx)("h1",{className:"text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left",children:t})},p=function(e){var t=e.title,n=e.date;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(m,{children:t}),(0,r.jsx)("div",{className:"max-w-2xl mx-auto",children:(0,r.jsx)("div",{className:"mb-6 text-lg",children:(0,r.jsx)(f.Z,{dateString:n})})})]})},h=n(6930),g=n(9008),y=n(5675),v=n(8093),b=n(3454);function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(){return(x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){w(e,t,n[t])}))}return e}var O=function(e){var t=e.src;return"true"===b.env.CI?"/iancanderson.com/".concat(t):t},k={Image:function(e){var t=x({},e);return(0,r.jsx)(y.default,j({loader:O},t))}},E=!0,S=function(e){var t=e.post,n=(e.morePosts,e.preview),c=(0,i.useRouter)();return c.isFallback||(null===t||void 0===t?void 0:t.slug)?(0,r.jsx)(h.Z,{preview:n,children:(0,r.jsxs)(a.Z,{children:[(0,r.jsx)(d,{}),c.isFallback?(0,r.jsx)(m,{children:"Loading\u2026"}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("article",{className:"mb-32",children:[(0,r.jsx)(g.default,{children:(0,r.jsxs)("title",{children:[t.title," | iancanderson.com"]})}),(0,r.jsx)(p,{title:t.title,date:t.date}),(0,r.jsx)(s,{children:(0,r.jsx)(v.R,j({},t.content,{components:k}))})]})})]})}):(0,r.jsx)(o.default,{statusCode:404})}},6834:function(e){e.exports={markdown:"markdown-styles_markdown__h_8de"}},7663:function(e){!function(){var t={162:function(e){var t,n,r=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"===typeof setTimeout?setTimeout:i}catch(e){t=i}try{n="function"===typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var c,l=[],s=!1,u=-1;function d(){s&&c&&(s=!1,c.length?l=c.concat(l):u=-1,l.length&&f())}function f(){if(!s){var e=a(d);s=!0;for(var t=l.length;t;){for(c=l,l=[];++u<t;)c&&c[u].run();u=-1,t=l.length}c=null,s=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function p(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new m(e,t)),1!==l.length||s||a(f)},m.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=p,r.addListener=p,r.once=p,r.off=p,r.removeListener=p,r.removeAllListeners=p,r.emit=p,r.prependListener=p,r.prependOnceListener=p,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var o=n[e]={exports:{}},a=!0;try{t[e](o,o.exports,r),a=!1}finally{a&&delete n[e]}return o.exports}r.ab="//";var i=r(162);e.exports=i}()},5809:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.imageConfigDefault=t.VALID_LOADERS=void 0;t.VALID_LOADERS=["default","imgix","cloudinary","akamai","custom"];t.imageConfigDefault={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"]}},2918:function(e,t,n){e.exports=n(9185)},5675:function(e,t,n){e.exports=n(8045)},1163:function(e,t,n){e.exports=n(387)}},function(e){e.O(0,[629,774,888,179],(function(){return t=9035,e(e.s=t);var t}));var t=e.O();_N_E=t}]);