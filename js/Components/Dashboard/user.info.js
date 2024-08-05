import { makeGraphQLRequest } from "../../Utils/gql.request.js";
import { start } from "../../Utils/session.js"


export class CustomUser extends HTMLElement {
    connectedCallback() {
        this.#content()
    }

    #content() {
        let query = `{
            user {
              lastName
              firstName
              login
              email
              auditRatio
              attrs
            }
          }`;

        makeGraphQLRequest(query).then((val => {

            let u = val.data.user[0]
            this.innerHTML = ` <div class="user-info-container">
            <h1>TALENT</h1>
                <p><strong>Name:</strong> ${u.firstName + " " + u.lastName}</p>
                <p><strong>Login:</strong> ${u.login} </p>
                <p><strong>Email:</strong> ${u.email} </p>
                <p><strong>Age:</strong> ${u.attrs.age}</p>
                <p><strong>City:</strong> ${u.attrs.city}</p>
                <p><strong>Nationality:</strong> ${u.attrs.nationality1}</p>
                <p><strong>Gender:</strong> ${u.attrs.gender}</p>
                <p><strong>Year Experience:</strong> ${u.attrs.yearexp}</p>
            
        </div>`

        })).catch((reason) => {
            console.log('reason :>> ', reason);
            localStorage.removeItem('jwtToken')
            start()
        });

    }
}