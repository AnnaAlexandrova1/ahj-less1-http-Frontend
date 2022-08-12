export default class Card {
  constructor(data) {
    this.data = data;
  }

  init() {
    this.bindToDOM();
  }

  static template(data) {
    return `
    <div class="tickets__card" data-id="${data.id}" data-status="${data.status}">
    <div class="card__content">
      <div class="checkbox-wrapper">
        <div class="status__pic hidden"></div>
      </div>
      <span class="tickets__short-name">${data.name}</span>
      <span class="creation__date">${data.created}</span>
      <div class="button__block">
        <button class="ticket__edit"></button>
        <button class="ticket__del"></button>
      </div>
    </div>
    <div class="full__name-wrapper visual-none">
    <span class="tickets__full-name"></>
    </div>
  </div>`;
  }

  bindToDOM() {
    const board = document.querySelector('.board');

    const ticket = this.addTicket(this.data);

    board.insertAdjacentHTML('beforeend', ticket);
  }

  addTicket() {
    if (this.data) {
      const rezult = this.constructor.template(this.data);
      return rezult;
    }

    return false;
  }
}
