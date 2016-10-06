class Controller {
  constructor({ element }) {
    this.element = element
  }
  
  unrender() {
    this.element.innerHTML = ''
  }

  update() {

  }

  destroy() {
    this.unrender()
  }
}

export default Controller