export class CustomDash extends HTMLElement {
    connectedCallback() {
        /* this.appendChild(document.createElement('custom-user-info'))
        this.appendChild(document.createElement('pie-chart'))
        this.appendChild(document.createElement('point-chart'))
        this.appendChild(document.createElement('stick-chart'))
        // Mise en place du header
        if (!document.querySelector('custom-logout')) {
            const header = document.querySelector('header')
            header.innerHTML = `<div id="logo"><img src="img/logo_z01.png" alt="logo zone 01"></div>`
            header.appendChild(document.createElement('custom-logout'))
        } */
        this.#content()
    }

    #content() {
        const contentLayer = [
            'custom-user-info', 'custom-level',
            'custom-xp', 'custom-logo', 'pie-chart', 'stick-chart',
            'custom-logout', 'point-chart'
        ];

        for (let i = 0; i < contentLayer.length; i++) {
            const layer = contentLayer[i];
            const div = document.createElement('div')
            div.classList.add(`layer_${i+1}`)
            div.appendChild(document.createElement(layer));
            this.appendChild(div)
        }

    }

}