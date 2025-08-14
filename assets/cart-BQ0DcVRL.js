import{n as D,l as U}from"./ecoshoplogo-BBMl9hwc.js";const h="https://nology-group-project-production.up.railway.app/api",i=(e,r,t)=>{const n=document.createElement(e);return n.classList.add(r),t&&(n.innerText=t),n},B=async e=>{try{const r=await fetch(e);if(!r.ok)throw new Error(`API failed with response ${r.statusText} and error text ${r.status}`);return await r.json()}catch(r){if(r instanceof Error)console.error(`Fetch failed with error: ${r}`);else throw new Error("Unknown error occured")}return[]},x=async(e,r,t)=>{try{console.log(`${h}/ordered-products?orderId=${e}&productId=${r}&quantity=${t}`);const n=await fetch(`${h}/ordered-products?orderId=${e}&productId=${r}&quantity=${t}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!n.ok)throw new Error(`Order post failed, error: ${n.status}`);return"Ordered product posted successfully!"}catch(n){return console.log(n),"Ordered product creation failed"}},q=`<div id="userDivContainer" data-component="userUI">\r
    <div class="user-ui__title">\r
        <h2>Sign up or Sign in</h2>\r
    </div>\r
\r
    <div class="user-ui__forms">\r
        <!-- Create User -->\r
        <div class="user-ui__form user-ui__form--create" id="user-create">\r
            <div class="user-ui__form-container">\r
                <h3>Create New User</h3>\r
\r
                <form class="form form--create" id="form-create">\r
                    <label for="name-create">Name :</label><br />\r
                    <input\r
                        type="text"\r
                        id="name-create"\r
                        name="name"\r
                        value="John Doe"\r
                    /><br />\r
                    <label for="email-create">Email:</label><br />\r
                    <input\r
                        type="text"\r
                        id="email-create"\r
                        name="email"\r
                        value="Doe"\r
                    /><br /><br />\r
                    <input\r
                        id="submit-create"\r
                        type="submit"\r
                        value="Create New User"\r
                    />\r
                </form>\r
                <p class="user-ui__message" id="create-message"></p>\r
            </div>\r
        </div>\r
\r
        <span class="user-ui__separator">or</span>\r
\r
        <!-- Sign In -->\r
        <div class="user-ui__form user-ui__form--sign-in" id="user-signin">\r
            <h3>Sign in</h3>\r
\r
            <form class="form form--sign-in" id="form-signin">\r
                <label for="name-signin">Name :</label><br />\r
                <input\r
                    type="text"\r
                    id="name-signin"\r
                    name="name"\r
                    value="John Doe"\r
                /><br />\r
                <label for="email-signin">Email:</label><br />\r
                <input\r
                    type="text"\r
                    id="email-signin"\r
                    name="email"\r
                    value="Doe"\r
                /><br /><br />\r
                <input id="submit-signin" type="submit" value="Sign in" />\r
            </form>\r
            <p class="user-ui__message" id="signin-message"></p>\r
        </div>\r
    </div>\r
\r
    <div class="user-ui__display">\r
        <h3 id="user-display"></h3>\r
    </div>\r
</div>\r
`,y=document.querySelector("#userUI-root");y&&(y.innerHTML=q);const b=document.getElementById("user-create"),u=document.getElementById("user-signin"),m=document.getElementById("signin-message"),_=document.getElementById("create-message"),w=document.getElementById("form-create"),$=document.getElementById("form-signin"),E=document.getElementById("user-display"),g="https://nology-group-project-production.up.railway.app/";let a;w.addEventListener("submit",e=>{e.preventDefault();const r=new FormData(w),t={};r.forEach((o,s)=>{t[s]=o.toString()});const n={name:t.name,email:t.email};fetch(`${g}api/users`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(async o=>{if(!o.ok)throw new Error(`${o.status}`);return b.style.backgroundColor="#e6f9e6",_.innerText=`User with email ${n.email} registered successfully and signed in.`,a=await(await fetch(`${g}api/users/byEmail/${n.email}`)).json(),E.innerText=`Signed in as Name: ${a.name}, Email: ${a.email}`,o.json()}).catch(o=>{o=="Error: 500"&&(console.log("we got 500"),b.style.backgroundColor="#fbe4e4",_.innerText=`User with email ${n.email} already registered. Sign in instead`)})});const O=async e=>{e.preventDefault();const r=new FormData($),t=r.get("email");try{const n=await fetch(`${g}api/users/byEmail/${t}`);if(!n.ok)throw new Error(`Response status: ${n.status}`);const o=await n.json();console.log("Signed in user:",o),o.name==r.get("name")?(u.style.backgroundColor="#e6f9e6",m.innerText=`Welcome back, ${o.name}!`,a=o,E.innerText=`Signed in as Name: ${a.name}, Email: ${a.email}`):(u.style.backgroundColor="#fbe4e4",m.innerText=`Incorrect name for email ${t}. Please insert correct name.`)}catch(n){console.error(n.message),u.style.backgroundColor="#fbe4e4",m.innerText=`No account found for ${t}. Please create one.`}};$.addEventListener("submit",O);const k="https://nology-group-project-production.up.railway.app/api";let f=!1;const j=document.querySelector(".checkout-button"),v=document.querySelector(".checkout-grid__total--price"),L=document.querySelector(".checkout-page"),p=document.querySelector("#navbar-root");if(p){p.innerHTML=D;const e=p.querySelector(".navbar__logo-img");e&&(e.src=U)}const I=sessionStorage.getItem("checkoutProducts");I||console.error("No user input data found");const l=JSON.parse(I),N=l.map(e=>e.productId),S=await B(`${k}/products`),P=e=>{if(e){const r=i("div","checkout-product"),t=document.createElement("img");t.src=e.imgUrl,t.alt=e.name,t.classList.add("checkout-product__img");const n=i("h4","checkout-product__name",e.name),o=i("p","checkout-product__price",`£${e.price}`),s=i("p","checkout-product__quantity",`${l.find(T=>T.productId===e.id)?.quantity??0}`),d=i("div","checkout-product__info");d.appendChild(t),d.appendChild(n),r.appendChild(d),r.appendChild(o),r.appendChild(s),document.getElementById("productList").appendChild(r)}else throw new Error("failed to load products")};S?.filter(e=>N.includes(e.id)).forEach(P);const C=()=>l.reduce((e,r)=>{const t=S?.find(o=>o.id===r.productId),n=t?t.price*r.quantity:0;return e+n},0);if(v){const e=C();v.innerText=`£${e}`}const c=document.querySelector(".checkout-complete");console.log(c);const A=()=>{console.log(f+"calling function"),f&&(console.log(c),c.style.display="block",console.log("here"),L.style.display="none")};j.addEventListener("click",async()=>{try{console.log(a),console.log(a.id);const e=await fetch(`${k}/orders?userId=${a.id}`,{method:"POST"});if(!e.ok)throw new Error(`Order creation failed: ${e.status}`);const t=(await e.json()).id;console.log(t),await Promise.all(l.map(({productId:o,quantity:s})=>x(t,o,s))),f=!0,A();const n=i("p","checkout-complete__p",`Your order has been placed and your card will be charged £${C()}.
 
A confirmation email has be sent to ${a.email}`);c.appendChild(n)}catch(e){console.error("Checkout failed:",e)}});
