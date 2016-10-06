import Controller from 'core/controller'

const createCustomersComponent = ({
  CustomerModel,
  customerTemplate,
  customersListTemplate
}) => {
  return class Customer extends Controller {
    constructor(props) {
      super(props)
  
      this.template = customerTemplate
      this.partials = {
        customer: customersListTemplate
      }

      this.model = new CustomerModel()

      this.onCustomerAddHandler = this.onCustomerAddHandler.bind(this)
      
      this.init()
    }
  
    init() {
      this.render()
      this.bindEvents()
    }

    onCustomerAddHandler(e) {
      let target = e.target

      while (target && target.id !== 'create-customer') {
        target = target.parentNode;
      }

      if (!target) return

      e.preventDefault()
      this.createCustomer()
      this.update()
    }
    
    createCustomer() {
      this.model.add({
        id: +new Date(),
        name: 'Otto_' + Math.ceil(Math.random(10) * 10),
        birthday: '12.04.1989',
        surname: 'one more last name'
      })
    }

    bindEvents() {
      this.element.addEventListener('click', this.onCustomerAddHandler, false)
    }
  
    unbindEvents() {
      this.element.removeEventListener('click', this.onCustomerAddHandler, false)
    }
    
    update() {
      this.customersList = this.element.querySelector('#customers-list');
      this.customersList.innerHTML = this.partials.customer(this.model)
    }
  
    render() {
      this.element.innerHTML = this.template(this.model)
    }
  
    destroy() {
      this.unbindEvents()
      this.unrender()
    }
  }
}
export default createCustomersComponent