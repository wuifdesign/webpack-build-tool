import img from './demo.jpg'
import img2 from './1x1.png'

export const testFunction = async () => {
  console.log('TestFunction!!')
  console.log(img)
  console.log(img2)
  import(/* webpackChunkName: "test" */ './test').then((m) => m.testFunction2())
  return 123
}

testFunction()
