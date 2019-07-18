import React, { useEffect, useState } from 'react';
// import lottie from 'lottie-web';
import './index.scss';
// import lottieAnimation from '../../assets/lottieFiles/animation.json';
import lottieList from '../../assets//lottieFiles/lottieInfo';

import PageHead from '../../components/pagehead/pagehead';
import List from '../../components/list/list';

console.log(lottieList);

const Index: React.FC = () => {
  // 暂停动画
  return (
    <div className="index_page">
      <PageHead></PageHead>
      <List lotties={lottieList}></List>
    </div>
  );
}

export default Index;