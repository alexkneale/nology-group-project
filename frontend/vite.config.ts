import { defineConfig } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
    base: "/nology-group-project/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                cart: resolve(__dirname, "cart.html"),
                // add more pages here
            },
        },
    },
});
