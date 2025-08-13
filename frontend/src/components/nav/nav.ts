import nav from "./navigation.html?raw";
import logoUrl from "../../assets/ecoshoplogo.png";

const rootNavBar = document.querySelector("#navbar-root");
if (rootNavBar) rootNavBar.innerHTML = nav;

const initNavbar = (): void => {
    const img = document.querySelector<HTMLImageElement>(".navbar__logo-img");
    if (!img) return;

    img.src = logoUrl;

    img.onload = () => console.log("Logo loaded:", img.src);
    img.onerror = () => console.error("Logo failed to load:", img.src);
};

if (document.readyState !== "loading") {
    initNavbar();
} else {
    document.addEventListener("DOMContentLoaded", initNavbar);
}
