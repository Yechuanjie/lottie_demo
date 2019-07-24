import React, { useEffect, useState, useContext } from 'react';
import lottie from 'lottie-web';
import queryString from 'query-string'

import PageHead from '../../components/pagehead/pagehead';

interface IProps {
  [props: string]: any,
}

const Detail: React.FC<IProps> = (props) => {
  const [anim, setAnim] = useState();
  const parsed = queryString.parse(props.location.search);
  const { id, name, source } = parsed;
  console.info(props, parsed);

  const initLottieAnimation = (animationData: JSON) => {
    const element = document.querySelector('.lottie_wrap');
    const ins = lottie.loadAnimation({
      container: element as Element, // the dom element that will contain the animation
      renderer: 'svg',
      name: 'lottie',
      loop: true,
      autoplay: true,
      animationData
    });
    setAnim(ins);
  }

  useEffect(() => {
    const loadResource = async (source: string) => {
      const response = await fetch(source);
      const data = await response.json();
      initLottieAnimation(data);
    }
    loadResource(String(source));
  }, []);

  // 开始动画
  const startAnim = () => {
    console.info(id);
    console.info(anim);
    anim.goToAndStop(anim.totalFrames - 10, 1)
  }
  // 暂停动画

  return (
    <div className="detail_page">
      <PageHead></PageHead>
      <div className="lottie_wrap"></div>
      <span>ID:{id}</span>
      <div className="control">
        <button onClick={startAnim}>开始</button>
        <button>暂停</button>
      </div>
    </div>
  );
}

export default Detail;