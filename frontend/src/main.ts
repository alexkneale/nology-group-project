import "./components/nav/nav";
import "./components/content/content";
import "./components/shop/shop";

async function getData() {
    const url =
        "https://nology-group-project-production.up.railway.app/api/products";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}
getData();

const cartData: { productId: number; quantity: number }[] = [
    { productId: 6, quantity: 3 },
    { productId: 11, quantity: 1 },
    { productId: 8, quantity: 1 },
];

const productIds: number[] = cartData.map((obj) => obj.productId);
console.log(productIds);

export type Product = {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    quantity_in_stock: number;
    img_url: string;
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

const allProductData = await getProductData(
    "https://nology-group-project-production.up.railway.app/api/products"
);

const productData: Product[] | undefined = allProductData?.filter((product) =>
    productIds.includes(product.id)
);

console.log(productData);
