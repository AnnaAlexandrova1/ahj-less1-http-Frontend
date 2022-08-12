import Form from "./Form";
import Controller from "./controller";

const container = document.querySelector('.container')
const form = new Form(container)

const controller = new Controller(form)
controller.start()