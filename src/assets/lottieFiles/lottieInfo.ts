const resource = [
  'https://assets1.lottiefiles.com/packages/lf20_V2yuoK.json',
  'https://assets10.lottiefiles.com/packages/lf20_mHMuHN.json',
  'https://assets2.lottiefiles.com/packages/lf20_1pTi71.json',
  'https://assets1.lottiefiles.com/packages/lf20_hwCzAN.json',
  'https://assets7.lottiefiles.com/packages/lf20_zbzK2r.json',
  'https://assets1.lottiefiles.com/datafiles/AembVTvov5PkTSJ/data.json'
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