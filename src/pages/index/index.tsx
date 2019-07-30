import React, { useEffect, useState } from 'react';
// import lottie from 'lottie-web';
import './index.scss';
// import lottieAnimation from '../../assets/lottieFiles/animation.json';
import lottieList from '../../assets//lottieFiles/lottieInfo';

import PageHead from '../../components/pagehead/pagehead';
import List from '../../components/list/list';

const ua = window.navigator.userAgent;
const isHuawei = ua.indexOf('huawei' || 'HUAWEI') > -1;
isHuawei ? require('../../assets/appRouter.huawei') : require("../../assets/appRouter");
// /**
//   * 加载远程json文件
//   * @param {string} sourceurl
//   * @returns 返回json对象
//   */
// const loadResource = async (sourceurl: string) => {
//   const response = await fetch(sourceurl);
//   const data = await response.json();
//   return data;
// }
// loadResource("https://statres.quickapp.cn/quickapp/js/routerinline.min.js").then(res => {
//   console.info(res);
// })

const Index: React.FC = () => {
  const toApp = () => {
    // if (!isHuawei) {
    //   window.channelReady((bAvailable: boolean) => {
    //     alert("是否存在框架服务：" + bAvailable)
    //   })
    // }
    alert(window.navigator.userAgent);
    window.appRouter("com.calendar.wnl", "/pages/index", { initTabIndex: 2});
  };
  return (
    <div className="index_page">
      <PageHead></PageHead>
      <List lotties={lottieList}></List>
      <button onClick={toApp}>打开快应用</button>
    </div>
  );
}

export default Index;