import createAppointmentComponent from './Appointment'
import CustomerModel from 'models/customer'
import AppointmentModel from 'models/appointment'
import appointmentTemplate from './templates/appointments-box.handlebars'
import appointmentListTemplate from './templates/partials/appointment.handlebars'

export default createAppointmentComponent({
  AppointmentModel,
  CustomerModel,
  appointmentTemplate,
  appointmentListTemplate 
})