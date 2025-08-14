import{n as w,l as M}from"./ecoshoplogo-BBMl9hwc.js";const s={cart:[]},y=[],k=t=>{const e=s.cart.find(n=>n.product.id===t.id);e?e.quantity++:s.cart.push({product:t,quantity:1}),y.forEach(n=>n(s))},H=t=>{const e=s.cart.findIndex(n=>n.product.id===t);if(e>-1){const n=s.cart[e];n.quantity--,n.quantity===0&&s.cart.splice(e,1),y.forEach(o=>o(s))}},g=t=>{y.push(t)},u=()=>s,P=`<div class="modal-overlay" id="order-modal-overlay">\r
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
`,v=document.createElement("div");v.id="modal-root";v.innerHTML=P;document.body.appendChild(v);const l=document.getElementById("order-modal-overlay"),$=document.getElementById("modal-close-btn"),m=document.getElementById("modal-cart-items"),A=document.getElementById("modal-total-price"),p=document.getElementById("place-order-btn"),F=()=>{l.classList.add("visible")},I=()=>{l.classList.remove("visible")},j=t=>{const e=document.createElement("div");return e.classList.add("modal-cart-item"),e.innerHTML=`
    <span>${t.product.name} (x${t.quantity})</span>
    <span>£${(t.product.price*t.quantity).toFixed(2)}</span>
  `,e},q=()=>{const{cart:t}=u();m.innerHTML="",t.length===0?(m.innerHTML="<p>Your cart is empty.</p>",p.disabled=!0):(t.forEach(n=>{const o=j(n);m.appendChild(o)}),p.disabled=!1);const e=t.reduce((n,o)=>n+o.product.price*o.quantity,0);A.innerText=`£${e.toFixed(2)}`};$.addEventListener("click",I);l.addEventListener("click",t=>{t.target===l&&I()});p.addEventListener("click",async()=>{const{cart:t}=u();if(t.length===0)return;const e=t.map(n=>({productId:n.product.id,quantity:n.quantity}));sessionStorage.setItem("checkoutProducts",JSON.stringify(e)),window.location.href="cart.html"});g(q);q();const E=document.querySelector("#navbar-root");E&&(E.innerHTML=w);const f=()=>{const t=u(),e=t.cart.reduce((a,c)=>a+c.product.price*c.quantity,0),n=t.cart.reduce((a,c)=>a+c.quantity,0),o=document.querySelector(".navbar__cart-total"),r=document.querySelector(".navbar__cart-count");o&&(o.innerText=`£${e.toFixed(2)}`),r&&(r.innerText=n.toString())},L=()=>{const t=document.querySelector(".navbar__logo-img");if(!t)return;t.src=M,t.onload=()=>console.log("Logo loaded:",t.src),t.onerror=()=>console.error("Logo failed to load:",t.src),g(f),f();const e=document.querySelector(".navbar__cart-btn");e&&e.addEventListener("click",F)};document.readyState!=="loading"?L():document.addEventListener("DOMContentLoaded",L);const N=`<section class="product-section">\r
    <div class="product-section_info">\r
        <h2 class="product-section__title"></h2>\r
        <div class="product-section__image-wrapper">\r
            <img\r
                class="product-section__image"\r
                src="/frontend/assets/clothing.jpg"\r
                alt="Collab Artwork"\r
            />\r
        </div>\r
    </div>\r
</section>\r
`,C=document.querySelector("#content-root");C&&(C.innerHTML=N);const O=`<section class="shop-section" id="shop">\r
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
`,b=document.querySelector("#shop-root");b&&(b.innerHTML=O);const D="https://nology-group-project-production.up.railway.app/api/products",R=async()=>{try{const t=await fetch(D);if(!t.ok)throw new Error(`API error: API request failed with error message: ${t.statusText} and error code ${t.status}`);return await t.json()}catch(t){return console.error("Error:",t),[]}},T=t=>{if(t){const e=document.createElement("div");e.classList.add("shop-card"),e.dataset.productId=String(t.id);const n=document.createElement("img");n.classList.add("shop-card__image"),n.src=t.imgUrl,n.alt=t.name;const o=document.createElement("h3");o.classList.add("shop-card__name"),o.innerText=t.name;const r=document.createElement("p");r.classList.add("shop-card__price"),r.innerText=`£${t.price.toFixed(2)}`;const a=document.createElement("p");a.classList.add("shop-card__description"),a.innerHTML=`<strong>Description:</strong></strong> ${t.description}`;const c=document.createElement("p");c.classList.add("shop-card__quantity"),c.innerText="In Cart: 0";const i=document.createElement("button");i.classList.add("shop-card__cart-btn"),i.innerText="Add to Cart",i.addEventListener("click",()=>{k(t)});const d=document.createElement("button");d.classList.add("shop-card__remove-btn"),d.innerText="Remove from Cart",d.addEventListener("click",()=>{H(t.id)}),e.appendChild(n),e.appendChild(o),e.appendChild(r),e.appendChild(a),e.appendChild(c),e.appendChild(i),e.appendChild(d),document.getElementById("itemList").appendChild(e)}else{const e=document.createElement("div");e.innerText="Error Loading Product Data",document.getElementById("itemList").appendChild(e)}};let h=[];const _=()=>{const{cart:t}=u();document.querySelectorAll(".shop-card").forEach(n=>{const o=Number(n.dataset.productId),r=t.find(i=>i.product.id===o),a=n.querySelector(".shop-card__quantity"),c=n.querySelector(".shop-card__remove-btn");a&&(a.innerText=`In Cart: ${r?.quantity||0}`),c&&(c.disabled=!r)})};R().then(t=>{h=t,h.forEach(e=>{T(e)}),_()});g(_);const x=document.getElementById("searchInput"),S=document.getElementById("categoryFilter");S.addEventListener("change",B);x.addEventListener("input",B);function B(){const t=x.value.toLowerCase(),e=S.value,n=h.filter(r=>(e==="all"||r.category===e)&&r.name.toLowerCase().includes(t)),o=document.getElementById("itemList");if(o.innerHTML="",n.length===0){const r=document.createElement("div");r.classList.add("no-results"),r.innerText="No results found, Try checking your spelling. ",o.appendChild(r)}else n.forEach(r=>{T(r)});_()}
