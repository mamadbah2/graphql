export class CustomDash extends HTMLElement {
    connectedCallback() {
        this.appendChild(document.createElement('point-chart'))
        this.appendChild(document.createElement('custom-user-info'))
        this.appendChild(document.createElement('pie-chart'))
        this.appendChild(document.createElement('custom-logout'))
    }

    
}