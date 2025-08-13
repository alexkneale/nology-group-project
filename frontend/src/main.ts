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
