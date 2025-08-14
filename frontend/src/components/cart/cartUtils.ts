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
