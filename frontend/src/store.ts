export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imgUrl: string;
    quantityInStock: number;
};

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartState = {
    cart: CartItem[];
};

const state: CartState = {
    cart: [],
};

const listeners: ((state: CartState) => void)[] = [];

export const addToCart = (product: Product) => {
    const existingItem = state.cart.find(
        (item) => item.product.id === product.id
    );
    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.push({ product, quantity: 1 });
    }
    listeners.forEach((listener) => listener(state));
};

export const removeFromCart = (productId: number) => {
    const itemIndex = state.cart.findIndex(
        (item) => item.product.id === productId
    );
    if (itemIndex > -1) {
        const item = state.cart[itemIndex];
        item.quantity--;
        if (item.quantity === 0) {
            state.cart.splice(itemIndex, 1);
        }
        listeners.forEach((listener) => listener(state));
    }
};

export const clearCart = () => {
    state.cart = [];
    listeners.forEach((listener) => listener(state));
};

export const subscribe = (listener: (state: CartState) => void) => {
    listeners.push(listener);
};

export const getCartState = () => state;
