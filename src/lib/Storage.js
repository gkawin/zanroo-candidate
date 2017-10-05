import Faker from 'faker'
import _ from 'lodash'

class Storage {
  constructor () {
    this.store = window.sessionStorage || { }
    this.initItems = []
  }

  initLocalStorage (len = 5) {
    const getMockData = () => ({
      name: Faker.name.findName(),
      age: Math.floor(Math.random() * 30),
      nickname: Faker.name.lastName()
    })
    for (let i = 0; i < len; i++) {
      this.initItems.push(getMockData())
    }
    if (!_.isEmpty(this.store.getItem('initItems'))) {
      this.store.getItem('initItems')
    } else {
      this.store.setItem('initItems', JSON.stringify(this.initItems))
    }
  }

  getData () {
    return JSON.parse(this.store.getItem('initItems'))
  }
}

export default Storage
