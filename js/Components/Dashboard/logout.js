import { start } from "../../Utils/session.js"

export class customLogout extends HTMLElement {
    connectedCallback() {
        this.#content()
        this.#attachEvents()
    }

    #content() {
        this.innerHTML = `<button id="logout">
        LOGOUT
    </button>`
    }

    #attachEvents() {
        const logout = this.querySelector('button')

        logout.addEventListener('click', () => {
            localStorage.removeItem('jwtToken')
            start()
        })
    }
}