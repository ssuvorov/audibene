class Customer {
  constructor() {
    this.items = this.load() || []
  }

  add(item) {
    this.items.push(item)
    this.save()
  }

  getById(id) {
    return this.items.filter(item => item.id === id)[0]
  }
  
  getAll() {
    return this.items
  }

  load() {
    return JSON.parse(localStorage.getItem('customers'))
  }

  save() {
    localStorage.setItem('customers', JSON.stringify(this.items))
  }
}

export default Customer