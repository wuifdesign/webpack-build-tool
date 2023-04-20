import img from './demo.jpg'
import img2 from './1x1.png'

export const testFunction = async () => {
  import(/* webpackChunkName: "test" */ './test').then((m) => m.testFunction2())
  return [img, img2]
}

testFunction()
