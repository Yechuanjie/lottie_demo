import React, { useEffect, useState, useContext } from 'react';
import { match } from 'react-router-dom';
import lottie from 'lottie-web';
import lottieAnimation from '../../assets/lottieFiles/animation.json';

import PageHead from '../../components/pagehead';
// type Props={
//   children?: React.ReactNode;
//   [prop: string]: any;
// }
const Detail: React.FC<any> = (props, d) => {
  const [anim, setAnim] = useState();
  console.info(props.match.params.id);
  useEffect(() => {
    const element = document.querySelector('.lottie_wrap');
    const ins = lottie.loadAnimation({
      container: element as Element, // the dom element that will contain the animation
      renderer: 'svg',
      name: 'lottie',
      loop: false,
      autoplay: true,
      animationData: lottieAnimation
    });
    setAnim(ins);
    return () => {
      
    }
  }, []);
  // 开始动画
  const startAnim = () => {
    console.info(anim);
    anim.goToAndStop(anim.totalFrames - 10, 1)
  }
  // 暂停动画

  return (
    <div className="detail_page">
      <PageHead></PageHead>
      <div className="lottie_wrap"></div>
      <span>ID:{props.match.params.id}</span>
      <div className="control">
        <button onClick={startAnim}>开始</button>
        <button>暂停</button>
      </div>
    </div>
  );
}

export default Detail;