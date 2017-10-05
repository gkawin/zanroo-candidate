import Storage from './Storage'

describe('Storage', () => {
  const store = new Storage()

  it('should have 10 default items', async () => {
    await store.initLocalStorage(10)
    const items = JSON.parse(sessionStorage.__STORE__['initItems'])
    expect(items.length).toBe(10)
  })
})
