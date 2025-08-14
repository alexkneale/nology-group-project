import modalHtml from "./modal.html?raw";
import "./modal.scss";
import { getCartState, subscribe, type CartItem } from "../../store";

const modalContainer = document.createElement("div");
modalContainer.id = "modal-root";
modalContainer.innerHTML = modalHtml;
document.body.appendChild(modalContainer);

const overlay = document.getElementById(
    "order-modal-overlay"
) as HTMLDivElement;
const closeBtn = document.getElementById(
    "modal-close-btn"
) as HTMLButtonElement;
const cartItemsContainer = document.getElementById(
    "modal-cart-items"
) as HTMLDivElement;
const modalTotalPriceEl = document.getElementById(
    "modal-total-price"
) as HTMLSpanElement;
const placeOrderBtn = document.getElementById(
    "place-order-btn"
) as HTMLButtonElement;

// show modal
export const openModal = () => {
    overlay.classList.add("visible");
};

// hide modal
const closeModal = () => {
    overlay.classList.remove("visible");
};

// Create an individual cart item element for the modal
const renderCartItem = (item: CartItem): HTMLDivElement => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("modal-cart-item");
    itemEl.innerHTML = `
    <span>${item.product.name} (x${item.quantity})</span>
    <span>£${(item.product.price * item.quantity).toFixed(2)}</span>
  `;
    return itemEl;
};

// Updates modal content based on cart state
const updateModalContent = () => {
    const { cart } = getCartState(); // Get current cart items
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        placeOrderBtn.disabled = true; // Disable order button
    } else {
        // Render each item in the cart
        cart.forEach((item) => {
            const itemEl = renderCartItem(item);
            cartItemsContainer.appendChild(itemEl);
        });
        placeOrderBtn.disabled = false; // Enable order button
    }

    // Calculate total price
    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    modalTotalPriceEl.innerText = `£${total.toFixed(2)}`;
};

//  close modal when close button is clicked
closeBtn.addEventListener("click", closeModal);

//  close modal if clicking outside the modal content
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        closeModal();
    }
});

// for placing an order
placeOrderBtn.addEventListener("click", async () => {
    const { cart } = getCartState();
    if (cart.length === 0) return;

    // Prepare the order payload
    const orderPayload = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
    }));

    sessionStorage.setItem("checkoutProducts", JSON.stringify(orderPayload));
    window.location.href = "cart.html";
});

subscribe(updateModalContent); // Subscribe to cart changes so modal updates automatically
updateModalContent(); // Initial render of modal content
