import { makeGraphQLRequest } from "../../Services/gql.request.js";

export class StickChart extends HTMLElement {
    connectedCallback() {
        this.#content();
        this.#info();
    }

    #content() {
        this.innerHTML = `<h1>SKILLS</h1>
        <svg transform="scale(1, -1)">
            <line x1="15" x2="360" y1="18" y2="18" stroke="#3EFA7D" stroke-width="1"/>
        </svg>`;
    }

    #info() {
        makeGraphQLRequest(`{
            user {
              transactions (distinct_on: [type] where: {type: {_like : "skill%"}}) {
                type
                amount
              } 
            }
        }`).then(val => {
            const skills = val.data.user[0].transactions
            const svg = this.querySelector('svg')
            let origin = 20; let ecart = 25
            for (let i = 0; i < skills.length; i++) {
                const skill = skills[i];
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                rect.setAttribute('x', `${origin + (i * ecart)}`)
                rect.setAttribute('y', `${origin}`);
                rect.setAttribute('width', '8')
                rect.setAttribute('height', `${skill.amount * 2.5}`)

                const div = document.createElement('div')
                rect.addEventListener('mouseover', () => {
                    console.log('hover :>> ', div);
                    div.classList.add('bulle')
                    div.innerHTML = `<p><strong>skill</strong> : ${skill.type}</p>
                    <p><strong>Amount</strong> : ${skill.amount} xp</p>`
                    this.appendChild(div)
                })
                rect.addEventListener('mouseout', ()=> {
                    this.removeChild(div)
                })

                svg.appendChild(rect)
            }
        })
    }

}