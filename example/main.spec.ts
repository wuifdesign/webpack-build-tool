import { testFunction } from './main'

describe('testFunction', () => {
  test('should return value', async () => {
    expect(await testFunction()).toBe(123)
  })
})
