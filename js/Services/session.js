export function start() {
    const main = document.querySelector('body main')
    main.innerHTML = ``
    if (localStorage.getItem('jwtToken')) {
        main.appendChild(document.createElement('custom-dashboard'))
    } else {
        main.appendChild(document.createElement('custom-login')) 

    }
}