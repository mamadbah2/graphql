import { makeGraphQLRequest } from "../../Services/gql.request.js";

export class PointChart extends HTMLElement {

  connectedCallback() {
    this.#content();
    this.info();

    setTimeout(() => {
      const customUser = document.querySelector('body')
      let wu = (customUser.offsetWidth * 2) / 3
      this.style.transform = `translateX(${wu}px)`;
    }, 2000)
    setTimeout(() => {
      this.style.cssText += `border: 1px solid rgb(61, 106, 255);
      padding: 10px;
      border-radius: 30px;
      background: #212121;
      box-shadow: 15px 15px 30px rgb(25, 25, 25),
          -15px -15px 30px rgb(60, 60, 60);`
    }, 2500);
  }

  #content() {
    this.innerHTML = `<h1>PROJECTS</h1>
    <div id="svgContainer">
        <svg version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
             x="0px" y="0px" viewBox="0 0 741 450"
             enable-background="new 0 0 741 450"
             xml:space="preserve"
             transform="scale(1, -1)">
          
            <!-- Modification des lignes pour démontrer le système de coordonnées -->
            <line fill="none" stroke="#4AC900" stroke-width="4" stroke-miterlimit="10" x1="0" y1="10" x2="740" y2="10"/>
            
            <g>
              <!-- Modification des cercles pour aligner avec les lignes -->
              
            </g>
            
            <!-- Modification du chemin pour clarifier les lignes verticales et horizontales -->
            <path id="graph-measurement" fill="none" stroke="#741E00" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
              M10,127H731 M10,127v-18 M113,127v-9.1 M731,109v18 M216,127v-9.1 M319,127v-9.1 M422,127v-9.1 M525,127v-9.1 M628,127v-9.1" 
              transform="translate(0, -120)"/>
        </svg>
    </div>
    `;

  }

  info() {

    const g = document.querySelector('g')
    const svg = document.querySelector('#svgContainer')
    makeGraphQLRequest(`{
            user {
              xps (where:  {path: {_regex: "/[^/]+/div-01+/[^/]+$"}})  
                {
                path 
                amount
              }
            }
          }`).then(val => {
      console.log('val.data.user[0] :>> ', val.data.user[0].xps);
      const everyProject = val.data.user[0].xps

      let amountTab = []
      for (let i = 0; i < everyProject.length; i++) {
        const p = everyProject[i];
        amountTab.push(p.amount + 5)
      }

      let max = Math.max(...amountTab)
      everyProject.sort((a, b) => a.amount - b.amount);
      console.log('everyProject :>> ', everyProject);
      for (let i = 0; i < everyProject.length; i++) {
        const p = everyProject[i];
        let cy = (p.amount / max) * 450
        let factor = 741 / everyProject.length
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('fill', '#FF8300')
        circle.setAttribute('cx', `${(i * factor) + 15}`)
        circle.setAttribute('cy', `${cy + 15}`)
        circle.setAttribute('r', '7')
        const div = document.createElement('div')
        circle.addEventListener('mouseover', () => {
          div.classList.add('bulle')
          div.innerHTML = `<p><strong>Path</strong> : ${p.path}</p>
                    <p><strong>Amount</strong> : ${p.amount} xp</p>`
          svg.appendChild(div)
        })
        circle.addEventListener('mouseout', () => {
          div.classList.remove('bulle')
          svg.removeChild(div)
        })
        g.appendChild(circle)
        // g.innerHTML += `<circle fill="#FF8300" cx="${(i*factor)+15}" cy="${cy+15}" r="5"/>`
      }

    })
  }
}