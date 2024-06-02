import { makeGraphQLRequest } from "../../Services/gql.request.js";



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
            console.log('val :>> ', val.data.user[0]);

            let u = val.data.user[0]
            this.innerHTML = ` <div class="user-info-container">
            <h1>TALENT</h1>
            <div class="user-info">
                <p><strong>Name:</strong> ${u.firstName + " " + u.lastName}</p>
                <p><strong>Login:</strong> ${u.login} </p>
                <p><strong>Email:</strong> ${u.email} </p>
                <p><strong>Audit Ratio:</strong> ${u.auditRatio}</p>
                <p><strong>Age:</strong> ${u.attrs.age}</p>
                <p><strong>City:</strong> ${u.attrs.city}</p>
                <p><strong>Nationality:</strong> ${u.attrs.nationality1}</p>
                <p><strong>Gender:</strong> ${u.attrs.gender}</p>
                <p><strong>Year Experience:</strong> ${u.attrs.yearexp}</p>
            </div>
        </div>`

        }));

    }
}