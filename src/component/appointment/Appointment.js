import Controller from 'core/controller'

const createAppointmentComponent = ({
  AppointmentModel,
  CustomerModel,
  appointmentTemplate,
  appointmentListTemplate
}) => {
  return class Appointment extends Controller {
    constructor(props) {
      super(props)

      this.customerId = parseInt(props.params.customerid, 10)
      this.query = props.querystring
      this.template = appointmentTemplate
      this.partials = {
        appointment: appointmentListTemplate
      }


      this.customerModel = new CustomerModel()
      this.appointmentModel = new AppointmentModel()

      this.onDeleteHandler = this.onDeleteHandler.bind(this)

      this.prepare()
      this.init()
    }

    prepare() {
      const items = this.query ? this.appointmentModel.getByQuery(this.query) : this.appointmentModel.getAll()

      this.data = {
        query: this.query,
        items: items
      }
    }

    create() {
      if (!this.customerId) return

      const user = this.customerModel.getById(this.customerId)
      const firstDay = new Date("2016/06/07");
      const nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);

      this.appointmentModel.add({
        id: +new Date(),
        customerid: this.customerId,
        date: [nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate()].join('-'),
        time: new Date().getHours() + ':' + new Date().getMinutes(),
        name: user.name,
        surname: user.surname
      })
    }
  
    init() {
      this.create()
      this.render()
      this.bindEvents()
    }

    onDeleteHandler(e) {
      let target = e.target

      while (target && target.className !== 'delete-js') {
        target = target.parentNode;
      }

      if (!target) return

      const id = target.id
      
      e.preventDefault()
      this.deleteAppointment(id)
      this.update()
    }

    deleteAppointment(id) {
      this.appointmentModel.remove(id)
    }

    bindEvents() {
      this.element.addEventListener('click', this.onDeleteHandler, false)
    }
  
    unbindEvents() {
      this.element.removeEventListener('click', this.onDeleteHandler, false)
    }

    update() {
      this.element.querySelector('#appointments-list').innerHTML = this.partials.appointment(this.data)
    }

    render() {
      this.element.innerHTML = this.template(this.data)
    }
    
    destroy() {
      this.unbindEvents()
      this.unrender()
    }
  }
}

export default createAppointmentComponent