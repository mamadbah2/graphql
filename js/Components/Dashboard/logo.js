import { strToDom } from "../../Utils/utils.js";

export class CustomLogo extends HTMLElement {
    connectedCallback() {
        this.#content()
    }

    #content() {
        const svg = strToDom(`<img src="img/logo_zone.svg" alt="logo">`);
        console.log('svg :>> ', svg);
        let layerW = this.parentElement.clientWidth; let layerH = this.parentElement.clientHeight; const downHeight = 0
        svg.style.width = (layerW > layerH) ? (layerH - downHeight) + "px" : (layerW - downHeight) + "px"
        this.appendChild(svg);
    }

    #adaptSize() {
    }

}