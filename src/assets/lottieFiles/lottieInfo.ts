const resource = [
  {
    name: "施工",
    url: "https://assets1.lottiefiles.com/packages/lf20_BXafZO.json",
  },
  {
    name: "喝彩",
    url: "https://assets10.lottiefiles.com/packages/lf20_mHMuHN.json",
  },
  {
    name: "秋千",
    url: "https://assets2.lottiefiles.com/packages/lf20_1pTi71.json",
  },
  {
    name: "挖土",
    url: "https://assets1.lottiefiles.com/packages/lf20_hwCzAN.json",
  },
  {
    name: "旋转",
    url: "https://assets7.lottiefiles.com/packages/lf20_zbzK2r.json",
  },
  {
    name: "果汁",
    url: "https://assets1.lottiefiles.com/datafiles/AembVTvov5PkTSJ/data.json",
  },
];

const lotties: Array<Lottie> = new Array<Lottie>(resource.length);
const arr = Array.from(lotties);
let lottieList = arr.map((item, index) => {
  return {
    id: index + 1,
    name: resource[index].name,
    source: resource[index].url,
  };
});
export default lottieList;
