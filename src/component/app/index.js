import createAppComponent from './App'
import Customer from 'component/customer'
import Appointment from 'component/appointment'
import Router from 'core/router'

export default createAppComponent({
  Customer, Appointment, Router
})