export default class Form {
    constructor(container) {
     this.container = container;
    }
    
    static get markUp(){
        return `
        <div class="addTicket">
          <button class="addButton">Добавить тикет</button>
        </div>
        <div class="ticket-list">
          <h2 class="list__title">HelpDesk</h2>
          <span class="greeting__title">Ваш список пока Пруст...</span>
          <ul class="form hidden">
          </ul>
        </div>
        `
    }

    bindToDOM(){
        this.container.insertAdjacentHTML("afterbegin", this.constructor.markUp)
    }

  }
  