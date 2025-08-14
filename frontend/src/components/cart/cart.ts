import nav from "../nav/navigation.html?raw";
import logoUrl from "../../assets/ecoshoplogo.png";
import { createElement, getObject, createOrderedItems } from "./cartUtils";
import type { Product, Order } from "./cartUtils";
import "./userSignUp";
const BASE_URL = "https://nology-group-project-production.up.railway.app/api";

// need to replace with actual userId
const userId = 1;

const checkoutButton = document.querySelector(
    ".checkout-button"
) as HTMLButtonElement;

const checkoutTotal = document.querySelector(
    ".checkout-grid__total--price"
) as HTMLElement;
const checkoutPage = document.querySelector(".checkout-page") as HTMLDivElement;

// importing nav bar and logo
const rootNavBar = document.querySelector("#navbar-root");
if (rootNavBar) {
    rootNavBar.innerHTML = nav;
    const logoImg = rootNavBar.querySelector(
        ".navbar__logo-img"
    ) as HTMLImageElement;
    if (logoImg) logoImg.src = logoUrl;
}

// sample sessiondata to receive
const cartData: { productId: number; quantity: number }[] = [
    { productId: 6, quantity: 3 },
    { productId: 11, quantity: 1 },
    { productId: 8, quantity: 1 },
];
const productIds: number[] = cartData.map((obj) => obj.productId);

const allProductData = await getObject(`${BASE_URL}/products`);

// function to create cards for products
const productCards = (product: Product | null): void => {
    if (product) {
        const container = createElement("div", "checkout-product");
        const image = document.createElement("img");
        image.src = product.imgUrl;
        image.alt = product.name;
        image.classList.add("checkout-product__img");

        const name = createElement(
            "h4",
            "checkout-product__name",
            product.name
        );
        const price = createElement(
            "p",
            "checkout-product__price",
            `£${product.price}`
        );
        const quantity = createElement(
            "p",
            "checkout-product__quantity",
            `${
                cartData.find((item) => item.productId === product.id)
                    ?.quantity ?? 0
            }`
        );
        const productInfo = createElement("div", "checkout-product__info");
        productInfo.appendChild(image);
        productInfo.appendChild(name);
        container.appendChild(productInfo);
        container.appendChild(price);
        container.appendChild(quantity);

        const productDiv = document.getElementById(
            "productList"
        ) as HTMLElement;
        productDiv.appendChild(container);
    } else {
        throw new Error("failed to load products");
    }
};
// creating cards and filtering based on product id
allProductData
    ?.filter((product) => productIds.includes(product.id))
    .forEach(productCards);

const totalBasket = (): number => {
    return cartData.reduce((total, item) => {
        const product = allProductData?.find((p) => p.id === item.productId);
        const itemTotal = product ? product.price * item.quantity : 0;
        return total + itemTotal;
    }, 0);
};

if (checkoutTotal) {
    const total = totalBasket();
    checkoutTotal.innerText = `£${total}`;
}

// sending post request for ordered items, need for each
let orderComplete = false;
// event listeners
checkoutButton.addEventListener("click", async () => {
    try {
        const orderResponse = await fetch(
            `${BASE_URL}/orders?userId=${userId}`,
            {
                method: "POST",
            }
        );

        if (!orderResponse.ok) {
            throw new Error(`Order creation failed: ${orderResponse.status}`);
        }
        const orderGenerated = await orderResponse.json();
        const orderId = orderGenerated.id;
        console.log(orderId);
        //  creating ordered products using order id
        await Promise.all(
            cartData.map(({ productId, quantity }) =>
                createOrderedItems(orderId, productId, quantity)
            )
        );
        orderComplete = true;
        checkOrder();
    } catch (error) {
        console.error("Checkout failed:", error);
    }
});

const checkOrder = () => {
    console.log(orderComplete + "calling function");
    if (orderComplete) {
        checkoutPage.style.display = "none";
    }
};
