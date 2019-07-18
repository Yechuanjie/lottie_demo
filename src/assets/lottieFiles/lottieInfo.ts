
// interface Lottie {
//   id: number,
//   name: string
// }
let lotties: Array<Lottie> = new Array<Lottie>(10);
let n = Array.from(lotties);
let m = n.map((item, index) => {
  item = {
    id: index + 1,
    name: `anim_${index + 1}`
  }
  return item;
})
export default m;