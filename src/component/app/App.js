import Controller from 'core/controller'
import tabTemplate from 'component/tab/templates/tabs.handlebars'

const createAppComponent = ({ Customer, Appointment, Router }) => {
  return class App extends Controller {
    constructor(props) {
      super(props)
      
      this.active = {}
      this.template = tabTemplate
      this.data = {}

      this.router = new Router({
        '/': (options = {}) => {
          this.setView(Customer, options)
        },
        'appointment/:byDate?': (options = {}) => {
          this.setView(Appointment, options)
        },
        'appointment/customer/:customerid': (options = {}) => {
          this.setView(Appointment, options)
        }
      })

      this.init()
    }

    init() {
      this.render()
      this.router.init()
    }

    setView(View, options = {}) {
      if (!View) return

      const contentElement = this.element.querySelector('#tabs__content')

      options.element = contentElement

      if (this.active.destroy) {
        this.active.destroy()
      }
      const view = new View(options)

      this.active = view
    }
    
    render() {
      this.element.innerHTML = this.template(this.data)
    }
  }
}

export default createAppComponent
