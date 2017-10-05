import Faker from 'faker'
import _ from 'lodash'

const storage = window.sessionStorage
let initItems = []

export const initLocalStorage = (len = 5) => {
  const getMockData = () => ({
    name: Faker.name.findName(),
    age: Math.floor(Math.random() * 30),
    nickname: Faker.name.lastName()
  })
  for (let i = 0; i < len; i++) {
    initItems.push(getMockData())
  }
  if (!_.isEmpty(storage.getItem('initItems'))) {
    storage.getItem('initItems')
  } else {
    storage.setItem('initItems', JSON.stringify(initItems))
  }
}

export const getData = () => JSON.parse(storage.getItem('initItems'))

export const setData = async (payload) => {
  if (_.isEmpty(payload)) return false
  const updatedData = JSON.stringify(_.concat(getData(), payload))
  await storage.setItem('initItems', updatedData)
}

export const setAllData = async (payload) => {
  await storage.setItem('initItems', JSON.stringify(payload))
}
