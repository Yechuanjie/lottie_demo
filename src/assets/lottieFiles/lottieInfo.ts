const resource = [
  'https://assets1.lottiefiles.com/packages/lf20_V2yuoK.json',
  'https://assets10.lottiefiles.com/packages/lf20_mHMuHN.json'
];

const lotties: Array<Lottie> = new Array<Lottie>(resource.length);
const arr = Array.from(lotties);
let lottieList = arr.map((item, index) => {
  return {
    id: index + 1,
    name: `lottie_file_${index + 1}`,
    source: resource[index]
  }
})
export default lottieList;