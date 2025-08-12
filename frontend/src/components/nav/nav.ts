import nav from "./navigation.html?raw";

const rootNavBar = document.querySelector("#navbar-root");

if (rootNavBar) rootNavBar.innerHTML = nav;
