import img from './demo.jpg'
import img2 from './1x1.png'
import style from './demo.css?inline'

console.log(style)

export const testFunction = async () => {
  import(/* webpackChunkName: "test" */ './test').then((m) => m.testFunction2())
  return [img, img2]
}

testFunction().then((a) => console.log(a))
