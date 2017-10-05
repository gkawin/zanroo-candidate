import Faker from 'faker'

const storage = window.localStorage
let initItems = []

export const initLocalStorage = (len = 5) => {
  const getMockData = () => ({
    name: Faker.name.findName(),
    age: Faker.random.number(),
    nickname: Faker.name.lastName()
  })
  for (let i = 0; i < len; i++) {
    initItems.push(getMockData())
  }
  storage.setItem('initItems', JSON.stringify(initItems))
}

export const getData = () => JSON.parse(storage.getItem('initItems'))
