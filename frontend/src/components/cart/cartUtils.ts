// helper function to go in separate file
export const createElement = (
    tag: string,
    className: string,
    text?: string
): HTMLElement => {
    const el = document.createElement(tag);
    el.classList.add(className);
    if (text) el.innerText = text;
    return el;
};

export type Product = {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    quantity_in_stock: number;
    imgUrl: string;
};

export type Order = {
    id: number;
    basketTotal: number;
    productList: string;
};

// create a get request for orderid
export const getObject = async (url: string) => {
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
