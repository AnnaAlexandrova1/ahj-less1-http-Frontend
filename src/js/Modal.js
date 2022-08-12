export default class Modal{
    constructor(parentEl){
     this.parentEl= parentEl;
    }

    static get markup(){
        ` <div class="modal modal-active">
        
        <form class="modal-form-box">
        <div class="modal-content">
        <h3 class="description__title"></h3>
            <div class="button__block form__button">
                <button class="ticket__add-button">Добавить</button>
                <button class="modal-close__btn">Отменить</button>
            </div>
            </div>
        </form>
    </div>`;
    }

    static get markInput(){
        return `
        <div class="input-wrapper">
			<label for="lfname">Название:</label> 
			<input class="input-tooltip input__ticket-name" type="text" placeholder="Краткое описание"/>	
		</div>
         <div class=form-wrapper>
	 	<form class="form">
			<label for="lfDescription">Описание:</label> 
			<textarea class="form-text" type="text" rows="3" placeholder="Подробное описание"></textarea>
		</form>
        </div>`
    }

    redrawInput(){
        document.querySelector('.description__title').insertAdjacentHTML('."afterend", this.constructor.markInput')
    }

    redrawModalForm(){
        this.parentEl.insertAdjacentHTML("afterbegin", this.constructor.markup)
        this.modalWrapperEl.classList.add('modal-active')
        this.modalButtonEl.addEventListener('click', () => this.closeModalForm())
    }

    showInputValue(name, price){
        this.modalNameEl.value = name;
        this.modalPriceEl.value = price;
    }

    showDescription(text){
        document.querySelector('.description__title').textContent = text;
    }

    get modalWrapperEl() {
        return this.parentEl.querySelector('.modal')
    }

    get modalDescription(){
        return TouchList.parentEl.querySelector('.description__title')
    }
    
    set modalDescription(text){
        this.parentEl.querySelector(".description__title").textContent = text;
    }

    get modalButtonEl(){
       return  this.parentEl.querySelector('.modal-close__btn')
    }

    closeModalForm(){
        this.modalWrapperEl.classList.remove("modal-active")
        this.parentEl.querySelector('.modal').remove()
    }

}