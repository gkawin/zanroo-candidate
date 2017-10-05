import Storage from './Storage'
import _ from 'lodash'

describe('Storage', () => {
  const store = new Storage()
  store.initLocalStorage(10)
  it('should have 10 default items', () => {
    const items = JSON.parse(sessionStorage.__STORE__['initItems'])
    expect(items.length).toBe(10)
  })

  it('should return object type', () => {
    const result = store.find()
    expect(typeof result).toBe('object')
  })

  it('should add item', async () => {
    await store.insert({
      name: 'MR. JOHN DOWE',
      age: 30,
      nickname: 'NEW ONE!!!'
    })
    expect(_.some(store.find(), {
      name: 'MR. JOHN DOWE',
      age: 30,
      nickname: 'NEW ONE!!!'
    })).toBe(true)
  })

  it('should update as a index item', async () => {
    const items = store.find()
    expect(_.isEqual(_.last(items), {
      name: 'MR. JOHN DOWE',
      age: 30,
      nickname: 'NEW ONE!!!'
    })).toBe(true)

    await store.updateAt(10, {
      name: 'UPDATED DOWE',
      age: 66
    })
    expect(_.some(store.find(), { name: 'UPDATED DOWE', age: 66 })).toBe(true)
  })

  it('should delete as a index item', async () => {
    await store.deleteAt(10)
    expect(_.some(store.find(), { name: 'UPDATED DOWE', age: 66 })).toBe(false)
  })
})
