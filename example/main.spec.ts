import { testFunction } from './main'

describe('testFunction', () => {
  test('should return value', async () => {
    expect(await testFunction()).toEqual(['test-file-stub', 'test-file-stub'])
  })
})
