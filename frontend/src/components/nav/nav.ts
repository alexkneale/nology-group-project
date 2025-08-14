import nav from "./navigation.html?raw";
import logoUrl from "../../assets/ecoshoplogo.png";
import { getCartState, subscribe } from "../../store";
import { openModal } from "../modal/modal";

// injecting the navbar into index.html
const rootNavBar = document.querySelector("#navbar-root");
if (rootNavBar) rootNavBar.innerHTML = nav;

const updateCartDisplay = () => {
    const state = getCartState();
    const total = state.cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartTotalEl = document.querySelector<HTMLSpanElement>(
        ".navbar__cart-total"
    );
    const cartCountEl = document.querySelector<HTMLSpanElement>(
        ".navbar__cart-count"
    );

    if (cartTotalEl) {
        cartTotalEl.innerText = `£${total.toFixed(2)}`;
    }
    if (cartCountEl) {
        cartCountEl.innerText = count.toString();
    }
};

// logo
const initNavbar = (): void => {
    const img = document.querySelector<HTMLImageElement>(".navbar__logo-img");
    if (!img) return;
    img.src = logoUrl;
    img.onload = () => console.log("Logo loaded:", img.src);
    img.onerror = () => console.error("Logo failed to load:", img.src);
    subscribe(updateCartDisplay);
    updateCartDisplay();

    const cartBtn = document.querySelector(".navbar__cart-btn");
    if (cartBtn) {
        cartBtn.addEventListener("click", openModal);
    }
};
if (document.readyState !== "loading") {
    initNavbar();
} else {
    document.addEventListener("DOMContentLoaded", initNavbar);
}
