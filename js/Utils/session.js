export function start() {
    const main = document.querySelector('body main')
    main.innerHTML = ``
    if (localStorage.getItem('jwtToken')) {
        main.appendChild(document.createElement('custom-dashboard'))
        /* header.innerHTML = `<div id="logo"><img src="img/logo_z01.png" alt="logo zone 01"></div>`
        document.querySelector('header').appendChild(document.createElement('custom-logout')) */
    } else {
        main.appendChild(document.createElement('custom-login')) 
    }
}