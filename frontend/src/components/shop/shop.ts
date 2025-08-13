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
    card.classList.add("shop-card");

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
    description.innerHTML = `<strong>Description:</strong> ${product.description}`

    const cartBtn = document.createElement("button");
    cartBtn.classList.add("shop-card__cart-btn");


    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(cartBtn)

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

// Fetch products and render them
fetchProducts().then((fetchedProducts) => {
  products = fetchedProducts;
  products.forEach((product) => {
    productCardGenerator(product);
  });
});


const searchInput = document.getElementById("searchInput") as HTMLInputElement;
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const container = document.getElementById("itemList") as HTMLElement;
  container.innerHTML = "";

  products.filter((product) => product.name.toLowerCase().includes(query)).forEach((product) => productCardGenerator(product));
});