import React, { useEffect, useState, useContext } from 'react';
import lottie, { AnimationItem, AnimationConfig } from 'lottie-web';
import queryString from 'query-string'

import PageHead from '../../components/pagehead/pagehead';
import startIcon from '../../assets/images/start.svg';
import pauseIcon from '../../assets/images/pause.svg'
import './detail.scss';

interface IProps {
  [props: string]: any,
}

const Detail: React.FC<IProps> = (props) => {
  const parsed = queryString.parse(props.location.search);
  const { id, name, source } = parsed;
  const [totalFrame, setTotalFrame] = useState(0);
  /**
   *初始化动画
   * @param {JSON} animationData
   */
  const initLottieAnimation = (animationData: JSON) => {
    const element = document.querySelector('.lottie_wrap');
    const lottieObject = lottie.loadAnimation({
      container: element as Element, // the dom element that will contain the animation
      renderer: 'svg',
      name: name as string,
      loop: true,
      autoplay: true,
      animationData
    });
    return lottieObject;
  }

  /**
   * 加载远程json文件
   * @param {string} sourceurl
   * @returns 返回json对象
   */
  const loadResource = async (sourceurl: string) => {
    const response = await fetch(sourceurl);
    const data = await response.json();
    return data;
  }
  const [anim, setAnim] = useState();
  useEffect(() => {
    loadResource(String(source)).then(json => {
      setAnim(initLottieAnimation(json));
    });
  }, [source]); // 当source改变时执行

  // 开始|暂停动画
  const [isPlay, setPlay] = useState(true);
  const [nowFrame, setNowFrame] = useState(0);
  const togglePlay = () => {
    // console.info(anim.renderer.animationItem);
    isPlay ? anim.pause() : anim.play();
    setPlay(!isPlay);
    // setNowFrame(Math.floor(anim.currentRawFrame));
    // console.info(anim.currentRawFrame);
  };

  return (
    <div className="detail_page">
      <PageHead></PageHead>
      <div className="lottie_wrap"></div>
      <div className="control">
        <div className="play_wrap">
          <img className="play" onClick={togglePlay} src={isPlay ? pauseIcon : startIcon} alt="playcontrol" />
          <span>{anim && (anim).name}</span>
          <span>{nowFrame}/{totalFrame}</span>
        </div>
      </div>
    </div>
  );
}

export default Detail;