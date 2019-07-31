import React, { useEffect, useState, useContext } from 'react';
import lottie, { AnimationItem, AnimationConfig } from 'lottie-web';
import queryString from 'query-string'

import PageHead from '../../components/pagehead/pagehead';
import startIcon from '../../assets/images/start.svg';
import pauseIcon from '../../assets/images/pause.svg';
import speedIcon from '../../assets/images/fast-forward.svg';
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
  const [nowFrame, setnowFrame] = useState(0);
  const initLottieAnimation = async (animationData: JSON) => {
    const element = document.querySelector('.lottie_wrap');
    const lottieObject = await lottie.loadAnimation({
      container: element as Element, // the dom element that will contain the animation
      renderer: 'svg',
      name: name as string,
      loop: true,
      autoplay: true,
      animationData
    });
    lottieObject.addEventListener('enterFrame', (i) => {
      setnowFrame(Math.floor(i.currentTime));
    })
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
    loadResource(String(source)).then(async json => {
      const item = await initLottieAnimation(json);
      setAnim(item);
      console.info(item);
    });
  }, [source]); // 当source改变时执行

  // 开始|暂停动画
  const [isPlay, setPlay] = useState(true);
  const togglePlay = () => {
    isPlay ? anim.pause() : anim.play();
    setPlay(!isPlay);
  };

  // 设置速度
  const [speed, setspeed] = useState(1);
  const changeSpeed = ()=> {
    let nowspeed = speed;
    if (nowspeed < 2.5) {
      nowspeed += 0.5;
    } else {
      nowspeed = 1;
    }
    setspeed(nowspeed);
    anim.setSpeed(nowspeed);
  }

  return (
    <div className="detail_page">
      {/* <PageHead></PageHead> */}
      <div className="lottie_wrap"></div>
      {anim &&
        <div className="control">
          <div className="play_wrap">
            <img className="play" onClick={togglePlay} src={isPlay ? pauseIcon : startIcon} alt="playcontrol" />
            <span>{nowFrame}/{anim.totalFrames}</span>
          </div>
          <div className="speed_wrap" onClick={changeSpeed}>
            <div className="speed_icon">
              <img src={speedIcon} alt="" />
              <span>动画速度</span>
            </div>
            <span className="speed">{speed}x</span>
          </div>
        </div>
      }
    </div>
  );
}

export default Detail;