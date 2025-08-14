(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const l=`<nav class="navbar" data-component="navbar">\r
    <!-- Logo -->\r
    <div class="navbar__logo">\r
        <a href="#" class="navbar__logo-link" aria-label="Eco Collective home">\r
            <img\r
                class="navbar__logo-img"\r
                alt="Eco Collective logo"\r
                height="36"\r
            />\r
            <span class="sr-only"></span>\r
        </a>\r
    </div>\r
\r
    <!-- Links -->\r
    <ul class="navbar__menu" role="menubar">\r
        <li class="navbar__menu-item" role="none">\r
            <a href="#shop" class="navbar__menu-link" role="menuitem">Shop</a>\r
        </li>\r
        <li class="navbar__menu-item" role="none">\r
            <a href="#" class="navbar__menu-link" role="menuitem">About</a>\r
        </li>\r
        <li class="navbar__menu-item" role="none">\r
            <a href="#" class="navbar__menu-link" role="menuitem">Support</a>\r
        </li>\r
    </ul>\r
\r
    <!-- Cart -->\r
    <div class="navbar__actions">\r
        <button type="button" class="navbar__cart-btn" aria-label="Open cart">\r
            <span aria-hidden="true">🛒</span>\r
            <span>Cart</span>\r
            <span class="navbar__cart-count">0</span>\r
            <span class="navbar__cart-total">£0.00</span>\r
        </button>\r
    </div>\r
</nav>\r
`,i="/nology-group-project/assets/ecoshoplogo-D_qdGw2i.png";export{i as l,l as n};
