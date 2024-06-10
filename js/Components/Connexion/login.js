export class CustomLogin extends HTMLElement {
    connectedCallback() {
        this.#content();
        this.#attachEvents(this);
    }

    #content() {
        this.innerHTML = `<div class="container">
            <input id="signup_toggle" type="checkbox">
            <form id="login-form" class="form">
                <div class="form_front">
                    <div class="form_details">z01</div>
                    <p>Incorrects Fields</p>
                    <input type="text" id="username" class="input" placeholder="Username">
                    <input type="password" id="password" class="input" placeholder="Password">
                    <input type="button" value="Let's go" class="btn">
                    <span class="switch">Welcome, would you 
                        <label for="signup_toggle" class="signup_tog">
                            Reverse login
                        </label>
                    </span>
                </div>
            </form>
        </div>`
    }

    #attachEvents(elt) {
        this.querySelector('#login-form .btn').addEventListener('click', async function (event) {
            event.preventDefault();


            const main = document.querySelector('body main')
            const usernameEmail = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const credentials = btoa(`${usernameEmail}:${password}`);

            try {
                const response = await fetch('https://learn.zone01dakar.sn/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {

                    throw new Error('Identifiants incorrects');
                }

                const token = await response.json();
                // Stocker le JWT
                localStorage.setItem('jwtToken', token);

                // start()
                main.appendChild(document.createElement('custom-dashboard'))
                elt.remove()

            } catch (error) {
                // const form = document.querySelector('.form_front')
                const divError = document.querySelector('.form_front p')
                divError.style.opacity = '1'
                setTimeout(() => {
                    divError.style.opacity = '0'
                }, 2500)
                console.log('object :>> ', error.message);
            }
        });


    }
}