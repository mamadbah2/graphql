import { makeGraphQLRequest } from "../../Utils/gql.request.js";

export class StickChart extends HTMLElement {
    connectedCallback() {
        this.#content();
        this.#info();
    }

    #content() {
        this.innerHTML = `<h1>SKILLS</h1>
        <svg transform="scale(1, -1)">
            <line x1="0" x2="" y1="0" y2="0" stroke="#3EFA7D" stroke-width="1"/>
        </svg>
        <div id="libelle">
        
       </div>`;
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
            const line = this.querySelector('line')
            const libelle = this.querySelector('#libelle')
            let originX = 0; let originY = 6; let ecart = 25; let width = 8

            line.setAttribute('x2', (ecart*skills.length)+width)
            line.setAttribute('y1', originY-2); line.setAttribute('y2', originY-2)

            libelle.style.width = `${(ecart*skills.length)}px`
            libelle.style.transform= `translateX(-${width}px)`
            svg.style.width = `${(ecart*skills.length)}px`

            for (let i = 0; i < skills.length; i++) {
                const skill = skills[i];
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                rect.setAttribute('x', `${originX + (i * ecart)}`)
                rect.setAttribute('y', `${originY}`);
                rect.setAttribute('width', width)
                rect.setAttribute('height', `${skill.amount * 2.5}`)

                const div = document.createElement('div')
                rect.addEventListener('mouseover', () => {
                    console.log('hover :>> ', div);
                    div.classList.add('bulle')
                    div.innerHTML = `<p><strong>Amount</strong> : ${skill.amount} %</p>`
                    this.appendChild(div)
                })
                rect.addEventListener('mouseout', ()=> {
                    this.removeChild(div)
                })

                const span = document.createElement('span')
                span.textContent = skill.type.slice(6)
                libelle.appendChild(span)

                svg.appendChild(rect)
            }
        })
    }

}