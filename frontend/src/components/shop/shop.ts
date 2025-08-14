import shop from "./shop.html?raw";
import "./shop.scss";
import {
    type Product,
    addToCart,
    removeFromCart,
    getCartState,
    subscribe,
} from "../../store";

const rootShop = document.querySelector("#shop-root");

if (rootShop) rootShop.innerHTML = shop;

const BASE_URL =
    "https://nology-group-project-production.up.railway.app/api/products";

// Fetch products from the API
const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(
                `API error: API request failed with error message: ${response.statusText} and error code ${response.status}`
            );
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

// Product card generator
const productCardGenerator = (product: Product | null): void => {
    if (product) {
        const card = document.createElement("div");
        card.classList.add("shop-card");
        card.dataset.productId = String(product.id);

        const image = document.createElement("img");
        image.classList.add("shop-card__image");
        image.src = product.imgUrl;
        image.alt = product.name;

        const title = document.createElement("h3");
        title.classList.add("shop-card__name");
        title.innerText = product.name;

        const price = document.createElement("p");
        price.classList.add("shop-card__price");
        price.innerText = `£${product.price.toFixed(2)}`;

        const description = document.createElement("p");
        description.classList.add("shop-card__description");
        description.innerHTML = `<strong>Description:</strong></strong> ${product.description}`;

        const quantityInCart = document.createElement("p");
        quantityInCart.classList.add("shop-card__quantity");
        quantityInCart.innerText = "In Cart: 0";

        const cartBtn = document.createElement("button");
        cartBtn.classList.add("shop-card__cart-btn");
        cartBtn.innerText = "Add to Cart";
        cartBtn.addEventListener("click", () => {
            addToCart(product);
        });

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("shop-card__remove-btn");
        removeBtn.innerText = "Remove from Cart";
        removeBtn.addEventListener("click", () => {
            removeFromCart(product.id);
        });

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        card.appendChild(quantityInCart);
        card.appendChild(cartBtn);
        card.appendChild(removeBtn);

        const container = document.getElementById("itemList") as HTMLElement;
        container.appendChild(card);
    } else {
        const errorMess = document.createElement("div");
        errorMess.innerText = "Error Loading Product Data";
        const container = document.getElementById("itemList") as HTMLElement;
        container.appendChild(errorMess);
    }
};

let products: Product[] = [];

const updateCardsView = () => {
    const { cart } = getCartState();
    const allCards = document.querySelectorAll<HTMLDivElement>(".shop-card");

    allCards.forEach((card) => {
        const productId = Number(card.dataset.productId);
        const itemInCart = cart.find((item) => item.product.id === productId);

        const quantityEl = card.querySelector<HTMLParagraphElement>(
            ".shop-card__quantity"
        );
        const removeBtn = card.querySelector<HTMLButtonElement>(
            ".shop-card__remove-btn"
        );

        if (quantityEl) {
            quantityEl.innerText = `In Cart: ${itemInCart?.quantity || 0}`;
        }
        if (removeBtn) {
            removeBtn.disabled = !itemInCart;
        }
    });
};

// Fetch products and render them
fetchProducts().then((fetchedProducts) => {
    products = fetchedProducts;
    products.forEach((product) => {
        productCardGenerator(product);
    });
    updateCardsView();
});

subscribe(updateCardsView);


const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const categoryFilter = document.getElementById("categoryFilter") as HTMLSelectElement;

categoryFilter.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

function filterProducts(){
  
    const query = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProduct = products.filter((product)=> (selectedCategory === "all" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(query));

    const container = document.getElementById("itemList") as HTMLElement;
    container.innerHTML = "";

    if (filteredProduct.length === 0) {
       
        const noResultsMessage = document.createElement("div");
        noResultsMessage.classList.add("no-results");
        noResultsMessage.innerText = "No results found, Try checking your spelling. ";
        container.appendChild(noResultsMessage);
    } else {
        
        filteredProduct.forEach((product) => {
            productCardGenerator(product);
        });
    }
    updateCardsView();
  ;
}