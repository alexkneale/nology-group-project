# Frontend – Eco Collective Shop

This is a Vite + TypeScript + SCSS **e‑commerce shop** where people can browse products, filter by category, search by name, add and remove items from a cart, and place orders. The app is split into clear, reusable parts - the navigation bar, shop listings, cart modal, and user sign‑up/sign‑in. All styling follows **BEM** so class names stay tidy and easy to follow.

---

## What it does

-   Shows a product catalog with images, descriptions, and prices.
-   Lets shoppers search and filter products.
-   Allows adding items to a cart and removing them again.
-   Keeps the cart count and total up to date in real time.
-   Opens a cart modal with an order summary and checkout button.
-   Supports user sign‑up and sign‑in.
-   Sends orders to a backend API.

---

## How it works

### The big picture

```
index.html → holds placeholders for components
  ├─ nav.ts → injects the navbar, sets the logo, shows cart totals
  ├─ shop.ts → fetches products, builds product cards
  └─ modal.ts → sets up the cart modal, listens for updates

User actions → store.ts (add/remove/clear) → tells all subscribed parts to update
  ├─ nav.ts updates totals in the header
  ├─ shop.ts updates each card's “In Cart” number
  └─ modal.ts refreshes the order list and total
```

### Cart state (`store.ts`)

The cart is just an array in memory, managed with a few simple functions:

-   `addToCart(product)` - add or increase quantity.
-   `removeFromCart(productId)` - decrease quantity or remove the item.
-   `clearCart()` - empty the cart completely.
-   `subscribe(listener)` - run a function whenever the cart changes.
-   `getCartState()` - get the current cart.

This “pub/sub” setup means components don’t have to constantly check the cart, but they just react when told something has changed.

### Navbar (`nav.ts`)

1. Injects the HTML template into `#navbar-root`.
2. Sets the logo image.
3. Listens to the store for changes so it can recalculate:

    - **total price** = sum of price × quantity
    - **item count** = total quantities in the cart

4. Updates the display in the top right.
5. Opens the modal when the cart button is clicked.

### Shop (`shop.ts`)

1. Loads the shop HTML into `#shop-root`.
2. Fetches product data from the API.
3. Creates a card for each product with:

    - Image, name, price, description
    - “Add to Cart” and “Remove” buttons

4. Hooks the buttons up to `addToCart` and `removeFromCart`.
5. Updates each card’s “In Cart” display when the cart changes.
6. Filters and searches products when the user types or changes category.

### Cart Modal (`modal.ts`)

1. Adds the modal HTML to the page but keeps it hidden until opened.
2. Shows the current cart items, quantities, and total.
3. Disables the Place Order button when the cart is empty.
4. On checkout:

    - Sends the order to the backend.
    - Clears the cart and closes the modal.

### User sign‑up/sign‑in

-   On the cart page, users can either create a new account or sign in.
-   Sign‑up sends a `POST /api/users` request.
-   Sign‑in checks `GET /api/users/byEmail/:email`.
-   Shows the user’s name and email after a successful sign‑in.

### Checkout helpers (`cartUtils.ts`)

-   Helper to fetch JSON from a URL.
-   Helper to create ordered product records on the backend.
-   Example flow: create the order first, then send each item.

---

## Styling

-   **BEM** naming: `.block__element--modifier`.
-   Each component has its own SCSS file.
-   Some shared colours are in `palette.scss`.

---

## API calls

-   `GET /api/products`
-   `POST /api/orders`
-   `POST /api/ordered-products`
-   `POST /api/users`
-   `GET /api/users/byEmail/:email`

---

## Ideas for Next Steps

-   `Tidy up SCSS & BEM - Keep class names consistent, trim down deep nesting, and make sure each component’s styles live in its own little file.`
-   `Polish the styling - Even out spacing, pick a clear font setup, fine-tune colours and hover/focus states, and make buttons and cards feel like they belong together.`
-   `Add more shop features - Things like a product details page, sorting and pagination, wishlists, discount codes, stock indicators, and a cart that stays put even if you refresh the page.`
-   `Better accounts - Swap out the placeholder user ID for real sign-up/sign-in, and give users a page to see their order history.`
-   `Checkout upgrades – Let people enter delivery details, connect to a payment provider, and show a proper “order complete” screen instead of just alerts.`

---

## Getting started

```bash
cd frontend
npm install
npm run dev        # start development server
npm run build      # build for production
npm run preview    # preview the production build
```

---

## Deployment

1. `npm run build`
2. Upload the `dist/` folder to your hosting service.

---

## ## License

-   Eco Collective is licensed under the MIT License.

---

1. `npm run build`
2. Upload the `dist/` folder to your hosting service.

---

## Credits

Built by Rajan, Alex, Desi & Ella ❤️
