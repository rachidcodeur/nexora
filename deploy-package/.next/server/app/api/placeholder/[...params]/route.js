"use strict";(()=>{var e={};e.id=384,e.ids=[384],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3207:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>c,patchFetch:()=>h,requestAsyncStorage:()=>l,routeModule:()=>n,serverHooks:()=>u,staticGenerationAsyncStorage:()=>d});var a={};r.r(a),r.d(a,{GET:()=>i});var o=r(9303),s=r(8716),p=r(3131);async function i(e,{params:t}){let[r,a]=t.params[0].split("/").map(Number);return new Response(`
    <svg width="${r||400}" height="${a||300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f3f8"/>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#17E668;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#4ae3c1;stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Inter, sans-serif" font-size="16" fill="#6B7280">
        ${r||400} \xd7 ${a||300}
      </text>
    </svg>
  `,{headers:{"Content-Type":"image/svg+xml","Cache-Control":"public, max-age=31536000"}})}let n=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/placeholder/[...params]/route",pathname:"/api/placeholder/[...params]",filename:"route",bundlePath:"app/api/placeholder/[...params]/route"},resolvedPagePath:"/Users/Apple/Desktop/Projets Cursor/Nexora/app/api/placeholder/[...params]/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:l,staticGenerationAsyncStorage:d,serverHooks:u}=n,c="/api/placeholder/[...params]/route";function h(){return(0,p.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:d})}},9303:(e,t,r)=>{e.exports=r(517)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[948],()=>r(3207));module.exports=a})();