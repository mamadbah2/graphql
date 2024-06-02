export class CustomDash extends HTMLElement {
    connectedCallback() {
        this.appendChild(document.createElement('point-chart'))
        this.appendChild(document.createElement('custom-user-info'))
        this.appendChild(document.createElement('pie-chart'))
        if (!document.querySelector('custom-logout')) {
            const header = document.querySelector('header')
            header.innerHTML = `<div id="logo"><img src="img/logo_z01.png" alt="logo zone 01"></div>`   
            header.appendChild(document.createElement('custom-logout'))
        }
    }

    
}