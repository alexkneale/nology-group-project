import content from "./content.html?raw";

const rootContent = document.querySelector("#content-root");

if (rootContent) rootContent.innerHTML = content;
