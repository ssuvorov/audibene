const mockItems = [
  {
    id: 1,
    customerid: 0,
    date: '2016/08/17',
    time: '10:00',
    name: 'name',
    surname: 'surname'
  },
  {
    id: 2,
    customerid: 0,
    date: '2016/08/17',
    time: '11:40',
    name: 'name',
    surname: 'surname'
  }
]

class Appointment {
  constructor() {
    this.items = this.load() || []

    const mockItem = this.getById(mockItems[0].id)
    if (this.items.indexOf(mockItem) === -1) {
      this.items.push(mockItems[0], mockItems[1])
    }
  }

  add(item) {
    this.items.push(item)
    this.save()
  }

  getByQuery(query) {
    query = query.split('=')[1]
    
    return this.items.filter(item => {
      return new Date(item.date) > new Date(query)
    })
  }

  getById(id) {
    return this.items.filter(item => item.id === id)[0]
  }
  
  getByCustomerId(id) {
    return this.items.filter(item => item.customerid === id)[0]
  }

  getAll() {
    return this.items
  }
  
  remove(id) {
    id = parseInt(id, 10)

    const item = this.getById(id)
    const index = this.items.indexOf(item)

    this.items.splice(index, 1)

    this.save()
  }

  removeAll() {
    this.items = []
  }

  load() {
    return JSON.parse(localStorage.getItem('appointments'))
  }
  
  save() {
    localStorage.setItem('appointments', JSON.stringify(this.items))
  }
}

export default Appointment