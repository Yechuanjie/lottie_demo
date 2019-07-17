import React, { useEffect, useState } from 'react';
import lottie from 'lottie-web';
import './index.scss';
import lottieAnimation from '../../assets/lottieFiles/animation.json';

import PageHead from '../../components/pagehead';


const Index: React.FC = function () {
  const [anim, setAnim] = useState();
  useEffect(() => {
    const element = document.querySelector('.lottie_wrap') as Element;
    const ins = lottie.loadAnimation({
      container: element, // the dom element that will contain the animation
      renderer: 'svg',
      name: 'lottie',
      loop: false,
      autoplay: true,
      animationData: lottieAnimation
    });
    setAnim(ins);
  }, []);
  // 开始动画
  const startAnim = () => {
    console.info(anim);
    anim.goToAndStop(anim.totalFrames - 10, 1)
  }
  // 暂停动画
  return (
    <div className="index_page">
      <PageHead></PageHead>
      <div className="lottie_wrap"></div>
      <div className="control">
        <button onClick={startAnim}>开始</button>
        <button>暂停</button>
      </div>
    </div>
  );
}

export default Index;