import { makeGraphQLRequest } from "../../Services/gql.request.js";

class LevelXP extends HTMLElement {
    connectedCallback() {
        this._content()
        this._info()
    }

    _content() {
        this.innerHTML = `<div class="outer">
        <div class="dot"></div>
        <div class="card">
          <div class="ray"></div>
          <h1>Level</h1>
          <div class="text">750k</div>
        </div>
      </div>
      `
    }

    _info() {}
}

export class CustomLevel extends LevelXP {

    _info() {
        makeGraphQLRequest(`{
            user {
              transactions(distinct_on: type, order_by: {amount: desc, type: asc}, where: {type: {_like : "lev%"} _and: {path: {_like: "%div-%"} }}) {
                type
                amount
                path
              }
            }
        }`).then(val => {
            console.log('val.data.user[0] :>> ', val.data.user[0].transactions[0]);

            const level = val.data.user[0].transactions[0];
            const divCounter = this.querySelector('.text')
            const title = this.querySelector('h1')

            divCounter.textContent = `${level.amount}`
            title.textContent = `${level.type.toUpperCase()}`
        })
    }
}

export class CustomXP extends LevelXP {
    _info() {
        makeGraphQLRequest(`{
            user {
              transactions(distinct_on: type, order_by: {amount: desc, type: asc}, where: {type: {_like : "xp%"} _and: {path: {_like: "%div-%"} }}) {
                type
                amount
                path
              }
            }
        }`).then(val => {
            console.log('val.data.user[0] :>> ', val.data.user[0].transactions[0]);
            const level = val.data.user[0].transactions[0];
            const divCounter = this.querySelector('.text')
            const title = this.querySelector('h1')
            let amount = level.amount+""
            divCounter.textContent = amount.slice(0,-3)+'k'
            title.textContent = `${level.type.toUpperCase()}`
        })
    }
}