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
                    <div class="form_details">Login</div>
                    <input type="text" id="username" class="input" placeholder="Username">
                    <input type="password" id="password" class="input" placeholder="Password">
                    <div class="btn">Login</div>
                    <span class="switch">Don't have an account? 
                        <label for="signup_toggle" class="signup_tog">
                            Sign Up
                        </label>
                    </span>
                </div>
            </form>
        </div>`
    }
    
    #attachEvents(elt) {
        this.querySelector('#login-form .btn').addEventListener('click', async function(event) {
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
                    alert("Identifiants incorrects")
                    throw new Error('Identifiants incorrects');
                }
        
                const token = await response.json();
                // Stocker le JWT
                localStorage.setItem('jwtToken', token);

                main.appendChild(document.createElement('custom-dashboard'))
                elt.remove()
        
            } catch (error) {
                console.log('object :>> ', error.message); 
            }
        });
        
        
    }
}