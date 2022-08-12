import Modal from './Modal';
import AjaxManager from './API/AjaxManager';
import Card from './Card';

export default class Controller {
  constructor(listEditor) {
    this.listEditor = listEditor;
    this.api = new AjaxManager();
  }

  start() {
    this.listEditor.bindToDOM();
    this.container = document.querySelector('.container');

    document.addEventListener('DOMContentLoaded', () => {
      this.api.getAllTickets(
        this.renderingStartedList.bind(this),
      );
    });
    this.addSubscribe(this.container);
  }

  addSubscribe(element) {
    element.addEventListener('click', this.onClickAddCard.bind(this));
    element.addEventListener('click', this.onClickOpenForm.bind(this));
    element.addEventListener('click', this.onClickSaveCard.bind(this));
  }

  // добавлеие новой задачи
  onClickAddCard(e) {
    if (!e.target.classList.contains('ticket__add-button')) {
      return;
    }

    e.preventDefault();

    this.ticketName = document.querySelector('.input__ticket-name');
    this.ticketDescription = document.querySelector('.form-text');

    const isValidName = this.validityFields(this.ticketName);

    if (!isValidName) {
      return;
    }

    const data = {
      name: this.ticketName.value,
      description: this.ticketDescription.value,
    };

    this.api.createTicket(data, (response) => {
      this.renderingCard(response);
    });
    this.modal.closeModalForm();
  }

  // показать полное описание задачи
  showDescription(data, parent) {
    const boxDescription = parent.querySelector('.tickets__full-name');
    if (boxDescription) {
      boxDescription.textContent = data.description;

      boxDescription.parentElement.classList.toggle('visual-none');
      return;
    }
    const form = document.querySelector('.form-text');
    if (form) {
      form.value = data.description;
    }
  }

  // открытие формы для заполнения тикета
  onClickOpenForm(e) {
    e.preventDefault();

    if (
      e.target.classList.contains('add__button')
        || e.target.classList.contains('ticket__edit')
    ) {
      Array.from(document.querySelectorAll('.full__name-wrapper')).forEach(
        (elem) => elem.classList.add('visual-none'),
      );

      this.modal = new Modal(this.container);
      if (document.querySelector('.modal')) {
        return;
      }
      this.modal.redrawModalForm();
      this.modal.redrawInput();
    }

    if (e.target.classList.contains('ticket__edit')) {
      this.onEditValueButton('Сохранить', 'ticket__save-button');

      this.parentCard = e.target.closest('.tickets__card');
      this.name = this.parentCard.querySelector('.tickets__short-name');

      document.querySelector('.input__ticket-name').value = this.name.textContent;

      const data = { id: this.parentCard.dataset.id };

      this.api.getIndex(data.id, (response) => {
        this.showDescription(response, document.querySelector('.form-text'));
      });
    }
  }

  // сохранить тикет
  onClickSaveCard(e) {
    e.preventDefault();
    if (!e.target.classList.contains('ticket__save-button')) {
      return;
    }

    if (!this.newDescription && !this.newName) {
      this.modal.closeModalForm();
      return;
    }

    if (this.newName) {
      const isValidName = this.validityFields(this.newName);
      if (!isValidName) return;
      this.shortName = this.newName.value;
    }
    if (this.newDescription && !this.newName) {
      this.shortName = this.name.textContent;
    }

    const parent = this.name.parentElement.closest('.tickets__card');
    const fullName = parent.querySelector('.tickets__full-name');

    const data = {
      id: parent.dataset.id,
      name: this.shortName,
      description:
          this.newDescription || document.querySelector('.form-text').value,
    };

    this.api.modification(data, (response) => {
      this.savingChanges(this.name, data.name, fullName, data.description);
    });
  }

  removeTicket(item) {
    item.remove();
    this.modal.closeModalForm();

    if (!document.querySelector('.tickets__card')) {
      document.querySelector('.board').classList.add('hidden');
      document.querySelector('.greeting__title').classList.remove('hidden');
    }
  }

  savingChanges(nameBox, newName, descriptionBox, newDescription) {
    // сохранение изменений

    nameBox.textContent = newName;
    descriptionBox.textContentt = newDescription;
    this.modal.closeModalForm();
  }
}
