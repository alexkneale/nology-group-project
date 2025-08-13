import shop from "./shop.html?raw";

const rootShop = document.querySelector("#shop-root");

if (rootShop) rootShop.innerHTML = shop;

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imgUrl: string;
  quantityInStock: number;
};

const BASE_URL = "https://nology-group-project-production.up.railway.app/api/products";

// Fetch products from the API
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`API error: API request failed with error message: ${response.statusText} and error code ${response.status}`);
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
    card.classList.add("product-card");

    const title = document.createElement("h3");
    const description = document.createElement("p");
    const price = document.createElement("p");
    const category = document.createElement("p");
    const image = document.createElement("img");

    title.innerText = `Title: ${product.name}`;
    description.innerText = `Description: ${product.description}`;
    price.innerText = `Price: $${product.price}`;
    category.innerText = `Category: ${product.category}`;
    image.src = product.imgUrl;

    const elements = [title, description, price, category, image];
    elements.forEach((e) => {
      card.appendChild(e);
    });

    const container = document.getElementById("itemList") as HTMLElement;
    container.appendChild(card);
  } else {
    const errorMess = document.createElement("div");
    errorMess.innerText = "Error Loading Product Data";
    const container = document.getElementById("itemList") as HTMLElement;
    container.appendChild(errorMess);
  }
};

// Fetch products and render them
fetchProducts().then((products) => {
  // Render all products initially
  const container = document.getElementById("itemList") as HTMLElement;
  container.innerHTML = ""; // Clear any existing content

  products.forEach((product) => {
    productCardGenerator(product);
  });
});
