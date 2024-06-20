export function strToDom(str) {
    return document.createRange().createContextualFragment(str).firstChild;
}
