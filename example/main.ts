export const testFunction = async () => {
  console.log('TestFunction!!')
  import(/* webpackChunkName: "test" */ './test').then((m) => m.testFunction2())
  return 123
}

testFunction()
