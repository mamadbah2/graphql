import { makeGraphQLRequest } from "../../Services/gql.request.js";

function strToDom(str) {
    return document.createRange().createContextualFragment(str).firstChild;
}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toSvgPath() {
        return `${this.x} ${this.y}`
    }

    static fromAngle(angle) {
        return new Point(Math.cos(angle), Math.sin(angle))
    }
}

export class PieChart extends HTMLElement {

    connectedCallback() {
        this.#content();
        setTimeout(() => {
            const customUser = document.querySelector('body')
            let w = customUser.offsetWidth/3;
            this.style.transform = `translateX(${w}px)`
        }, 1000)

        setTimeout(() => {
            this.style.cssText += `border: 1px solid rgb(61, 106, 255);
            padding: 10px;
            border-radius: 30px;
            background: #212121;
            box-shadow: 15px 15px 30px rgb(25, 25, 25),
                -15px -15px 30px rgb(60, 60, 60);`
          }, 1500);
    }

    #content() {
        this.innerHTML = `<h1>RATIO</h1>`

        makeGraphQLRequest(
            `{
                user {
                  totalUp
                  totalDown
                }
              }`
        ).then(val => {
            console.log('val.data.user[0] :>> ', val.data.user[0]);
            // const shadow = this.attachShadow({ mode: 'open' });
            const colors = ['#FAAA32', '#3EFA7D', '#F6A625', '#0C94FA', '#FA1F19', '#0CFAE2', '#AB6D23'];
            this.data = Object.values(val.data.user[0]);
            const svg = strToDom(`<svg viewBox="-1 -1 2 2"></svg>`);

            // On crée les chemins
            this.path = this.data.map((_, k) => {
                const color = colors[k % (colors.length - 1)];
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('fill', color);
                path.addEventListener('mouseover', () => {

                })
                svg.appendChild(path);
                return path;
            });
            this.appendChild(svg);
            this.#draw();
        })
    }

    #draw() {
        const total = this.data.reduce((sum, value) => sum + value, 0);

        let angle = 0;
        let start = new Point(1, 0);

        for (let i = 0; i < this.data.length; i++) {
            const proportion = this.data[i] / total;
            angle += (proportion * 2) * Math.PI;

            const end = Point.fromAngle(angle);
            const largeFlag = proportion > 0.5 ? '1' : '0'
            const p = `M 0 0 L ${start.toSvgPath()} A 1 1 0 ${largeFlag} 1 ${end.toSvgPath()} L 0 0`;

            this.path[i].setAttribute("d", p);
            start = end;
        }
        this.innerHTML += ` <div>
        <div id="up">
            <span></span>
            up
        </div>
        <div id="down">
            <span></span>
            down
        </div>
    </div>`
    }
}


