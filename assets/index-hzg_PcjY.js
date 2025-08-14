(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const w=`<nav class="navbar" data-component="navbar">\r
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
`,M="/nology-group-project/assets/ecoshoplogo-D_qdGw2i.png",c={cart:[]},v=[],P=t=>{const e=c.cart.find(r=>r.product.id===t.id);e?e.quantity++:c.cart.push({product:t,quantity:1}),v.forEach(r=>r(c))},O=t=>{const e=c.cart.findIndex(r=>r.product.id===t);if(e>-1){const r=c.cart[e];r.quantity--,r.quantity===0&&c.cart.splice(e,1),v.forEach(a=>a(c))}},_=t=>{v.push(t)},u=()=>c,k=`<div class="modal-overlay" id="order-modal-overlay">\r
    <div class="modal">\r
        <button class="modal__close-btn" id="modal-close-btn">&times;</button>\r
        <h2 class="modal__title">Your Order</h2>\r
        <div class="modal__content" id="modal-cart-items">\r
            <!-- Cart items will be injected here -->\r
        </div>\r
        <div class="modal__footer">\r
            <p class="modal__total">\r
                Total: <span id="modal-total-price">£0.00</span>\r
            </p>\r
            <button class="modal__action-btn" id="place-order-btn">\r
                Place Order\r
            </button>\r
        </div>\r
    </div>\r
</div>\r
`,g=document.createElement("div");g.id="modal-root";g.innerHTML=k;document.body.appendChild(g);const d=document.getElementById("order-modal-overlay"),A=document.getElementById("modal-close-btn"),p=document.getElementById("modal-cart-items"),H=document.getElementById("modal-total-price"),m=document.getElementById("place-order-btn"),$=()=>{d.classList.add("visible")},q=()=>{d.classList.remove("visible")},F=t=>{const e=document.createElement("div");return e.classList.add("modal-cart-item"),e.innerHTML=`
    <span>${t.product.name} (x${t.quantity})</span>
    <span>£${(t.product.price*t.quantity).toFixed(2)}</span>
  `,e},I=()=>{const{cart:t}=u();p.innerHTML="",t.length===0?(p.innerHTML="<p>Your cart is empty.</p>",m.disabled=!0):(t.forEach(r=>{const a=F(r);p.appendChild(a)}),m.disabled=!1);const e=t.reduce((r,a)=>r+a.product.price*a.quantity,0);H.innerText=`£${e.toFixed(2)}`};A.addEventListener("click",q);d.addEventListener("click",t=>{t.target===d&&q()});m.addEventListener("click",async()=>{const{cart:t}=u();if(t.length===0)return;const e=t.map(r=>({productId:r.product.id,quantity:r.quantity}));sessionStorage.setItem("checkoutProducts",JSON.stringify(e)),window.location.href="cart.html"});_(I);I();const f=document.querySelector("#navbar-root");f&&(f.innerHTML=w);const b=()=>{const t=u(),e=t.cart.reduce((o,s)=>o+s.product.price*s.quantity,0),r=t.cart.reduce((o,s)=>o+s.quantity,0),a=document.querySelector(".navbar__cart-total"),n=document.querySelector(".navbar__cart-count");a&&(a.innerText=`£${e.toFixed(2)}`),n&&(n.innerText=r.toString())},E=()=>{const t=document.querySelector(".navbar__logo-img");if(!t)return;t.src=M,t.onload=()=>console.log("Logo loaded:",t.src),t.onerror=()=>console.error("Logo failed to load:",t.src),_(b),b();const e=document.querySelector(".navbar__cart-btn");e&&e.addEventListener("click",$)};document.readyState!=="loading"?E():document.addEventListener("DOMContentLoaded",E);const N=`<section class="product-section">\r
    <div class="product-section_info">\r
        <h2 class="product-section__title"></h2>\r
        <div class="product-section__image-wrapper">\r
            <img\r
                class="product-section__image"\r
                src="/clothing.jpg"\r
                alt="Collab Artwork"\r
            />\r
        </div>\r
    </div>\r
</section>\r
`,L=document.querySelector("#content-root");L&&(L.innerHTML=N);const j=`<section class="shop-section" id="shop">\r
    <div class="shop-section__filters">\r
        <input\r
            type="text"\r
            class="shop-section__search"\r
            placeholder="Search items..."\r
            id="searchInput"\r
        />\r
        <select id="categoryFilter" class="shop-section__category-filter">\r
            <option value="all">All Categories</option>\r
            <option value="men's clothing">Clothing</option>\r
            <option value="electronics">Electronics</option>\r
            <option value="jewelery">Accessories</option>\r
        </select>\r
    </div>\r
    <div class="shop-section__items" id="itemList"></div>\r
</section>\r
`,C=document.querySelector("#shop-root");C&&(C.innerHTML=j);const D="https://nology-group-project-production.up.railway.app/api/products",R=async()=>{try{const t=await fetch(D);if(!t.ok)throw new Error(`API error: API request failed with error message: ${t.statusText} and error code ${t.status}`);return await t.json()}catch(t){return console.error("Error:",t),[]}},T=t=>{if(t){const e=document.createElement("div");e.classList.add("shop-card"),e.dataset.productId=String(t.id);const r=document.createElement("img");r.classList.add("shop-card__image"),r.src=t.imgUrl,r.alt=t.name;const a=document.createElement("h3");a.classList.add("shop-card__name"),a.innerText=t.name;const n=document.createElement("p");n.classList.add("shop-card__price"),n.innerText=`£${t.price.toFixed(2)}`;const o=document.createElement("p");o.classList.add("shop-card__description"),o.innerHTML=`<strong>Description:</strong></strong> ${t.description}`;const s=document.createElement("p");s.classList.add("shop-card__quantity"),s.innerText="In Cart: 0";const i=document.createElement("button");i.classList.add("shop-card__cart-btn"),i.innerText="Add to Cart",i.addEventListener("click",()=>{P(t)});const l=document.createElement("button");l.classList.add("shop-card__remove-btn"),l.innerText="Remove from Cart",l.addEventListener("click",()=>{O(t.id)}),e.appendChild(r),e.appendChild(a),e.appendChild(n),e.appendChild(o),e.appendChild(s),e.appendChild(i),e.appendChild(l),document.getElementById("itemList").appendChild(e)}else{const e=document.createElement("div");e.innerText="Error Loading Product Data",document.getElementById("itemList").appendChild(e)}};let h=[];const y=()=>{const{cart:t}=u();document.querySelectorAll(".shop-card").forEach(r=>{const a=Number(r.dataset.productId),n=t.find(i=>i.product.id===a),o=r.querySelector(".shop-card__quantity"),s=r.querySelector(".shop-card__remove-btn");o&&(o.innerText=`In Cart: ${n?.quantity||0}`),s&&(s.disabled=!n)})};R().then(t=>{h=t,h.forEach(e=>{T(e)}),y()});_(y);const S=document.getElementById("searchInput"),x=document.getElementById("categoryFilter");x.addEventListener("change",B);S.addEventListener("input",B);function B(){const t=S.value.toLowerCase(),e=x.value,r=h.filter(n=>(e==="all"||n.category===e)&&n.name.toLowerCase().includes(t)),a=document.getElementById("itemList");if(a.innerHTML="",r.length===0){const n=document.createElement("div");n.classList.add("no-results"),n.innerText="No results found, Try checking your spelling. ",a.appendChild(n)}else r.forEach(n=>{T(n)});y()}
