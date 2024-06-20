import { makeGraphQLRequest } from "../../Utils/gql.request.js";
import { strToDom } from "../../Utils/utils.js";

export class PointChart extends HTMLElement {

  connectedCallback() {
    this.#content();
    this.#info();
  }

  #content() {
    this.innerHTML = `<h1>PROJECTS</h1>
    <div id="svgContainer">
        <svg transform="scale(1, -1)">
          
            <!-- Modification des lignes pour démontrer le système de coordonnées -->
            <line fill="none" stroke="#3EFA7D" stroke-width="3" stroke-miterlimit="10" x1="0" y1="3" x2="740" y2="3"/>
            
            <g>
              <!-- Modification des cercles pour aligner avec les lignes -->
              
            </g>
        </svg>
    </div>
    `;

  }

  #info() {

    const g = document.querySelector('g')
    const svg = document.querySelector('#svgContainer svg')
    makeGraphQLRequest(`{
            user {
              xps (where:  {path: {_regex: "/[^/]+/div-01+/[^/]+$"}})  
                {
                path 
                amount
              }
            }
          }`).then(val => {
      const everyProject = val.data.user[0].xps
      this.nbProject = everyProject.length

      let amountTab = []
      for (let i = 0; i < this.nbProject; i++) {
        const p = everyProject[i];
        amountTab.push(p.amount)
      }

      let max = Math.max(...amountTab)
      everyProject.sort((a, b) => a.amount - b.amount);

      let layerW = this.parentElement.clientWidth; let r = 4
      let layerH = this.parentElement.clientHeight
      let factor = layerW / 11
      console.log('layerH :>> ', layerH);
      const downHeight = 10
      // svg.style.width = (layerW > layerH) ? (layerH - downHeight) + "px" : (layerW - downHeight) + "px"
      svg.style.width = '95%'
      const betaDiv = strToDom('<div class="bulle"><p><strong>Path</strong> : Hover dot </p><p><strong>Amount</strong> : Hover dot</p></div>')
      svg.parentElement.appendChild(betaDiv)
      for (let i = this.nbProject - 11; i < this.nbProject; i++) {
        const p = everyProject[i];
        let cy = (p.amount / max) * (svg.clientHeight - r)
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('fill', '#faaa32')
        circle.setAttribute('cx', `${((this.nbProject - i) * factor)}`)
        circle.setAttribute('cy', `${cy}`)
        circle.setAttribute('r', r)
        // const div = document.createElement('div')
        circle.addEventListener('mouseover', () => {
          // div.classList.add('bulle')
          betaDiv.innerHTML = `<p><strong>Path</strong> : ${p.path}</p>
                    <p><strong>Amount</strong> : ${p.amount} xp</p>`
          // svg.parentElement.appendChild(div)
        })
        g.appendChild(circle)
        // g.innerHTML += `<circle fill="#FF8300" cx="${(i*factor)+15}" cy="${cy+15}" r="5"/>`
      }
    })
  }
}