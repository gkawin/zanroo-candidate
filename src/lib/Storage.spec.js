import Storage from './Storage'

describe('Storage', () => {
  const store = new Storage()
  store.initLocalStorage(10)
  it('should have 10 default items', () => {
    const items = JSON.parse(sessionStorage.__STORE__['initItems'])
    expect(items.length).toBe(10)
  })

  it('should return object type', () => {
    const result = store.getData()
    expect(typeof result).toBe('object')
  })
})
