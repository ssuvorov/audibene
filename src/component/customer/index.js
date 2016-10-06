import createCustomersComponent from './Customer'
import CustomerModel from 'models/customer'
import customerTemplate from './templates/customers-box.handlebars'
import customersListTemplate from './templates/partials/customer.handlebars'

export default createCustomersComponent({
  CustomerModel,
  customerTemplate,
  customersListTemplate
})