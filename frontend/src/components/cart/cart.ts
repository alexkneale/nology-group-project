import nav from "../nav/navigation.html?raw";
import logoUrl from "../../assets/ecoshoplogo.png";
import { createElement } from "./cartUtils";
import "./userSignUp";
const BASE_URL = "https://nology-group-project-production.up.railway.app/api";

const checkoutButton = document.querySelector(
    ".checkout-button"
) as HTMLButtonElement;

const checkoutTotal = document.querySelector(
    ".checkout-grid__total--price"
) as HTMLElement;

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

// fetching products (all)
export type Product = {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    quantity_in_stock: number;
    imgUrl: string;
};

export const getProductData = async (
    url: string
): Promise<Product[] | null> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `API failed with response ${response.statusText} and error text ${response.status}`
            );
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Fetch failed with error: ${error}`);
        } else {
            throw new Error(`Unknown error occured`);
        }
    }
    return [];
};
console.log(productIds);

const allProductData = await getProductData(`${BASE_URL}/products`);

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

// sending post request for order, ordered products
const createOrder = async (userId: number): Promise<string> => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${userId}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error(`Order post failed, error: ${response.status}`);
        }

        return "Order posted successfully!";
    } catch (error) {
        console.error(error);
        return "Order creation failed.";
    }
};
// sending post request for ordered items, need for each
const createOrderedItems = async (
    orderId: number,
    productId: number,
    quantity: number
): Promise<string> => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/ordered-products/?orderId=${orderId}&productId=${productId}&quantity=${quantity}`,
            {
                method: "POST",
            }
        );
        if (!response.ok) {
            throw new Error(`Order post failed, error: ${response.status}`);
        }
        return "Ordered product posted successfully!";
    } catch (error) {
        console.log(error);
        return "Ordered product creation failed";
    }
};

// need to replace with
const userId = 1;

// event listeners
checkoutButton.addEventListener("click", async () => {
    const message = await createOrder(userId);
    console.log(message);
});
