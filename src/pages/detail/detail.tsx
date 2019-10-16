import React, { useEffect, useState } from 'react';
import lottie from 'lottie-web';
import queryString from 'query-string'

import startIcon from '../../assets/images/start.svg';
import pauseIcon from '../../assets/images/pause.svg';
import speedIcon from '../../assets/images/fast-forward.svg';
import './detail.scss';

interface IProps {
  [props: string]: any,
}

const Detail: React.FC<IProps> = (props) => {
  const parsed = queryString.parse(props.location.search);
  const { name, source } = parsed;
  // const [totalFrame, setTotalFrame] = useState(0);
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
  const [nowFrame, setnowFrame] = useState(0);

  useEffect(() => {
    /**
     *初始化动画
    * @param {JSON} animationData
    */
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
    loadResource(String(source)).then(async json => {
      const item = await initLottieAnimation(json);
      setAnim(item);
      console.info(item);
    });
  }, [source, name]); // 当source, name改变时执行

  // 开始|暂停动画
  const [isPlay, setPlay] = useState(true);
  const togglePlay = () => {
    isPlay ? anim.pause() : anim.play();
    setPlay(!isPlay);
  };

  // 设置速度
  const [speed, setspeed] = useState(1);
  const changeSpeed = () => {
    let nowspeed = speed;
    if (nowspeed < 2.5) {
      nowspeed += 0.5;
    } else {
      nowspeed = 1;
    }
    setspeed(nowspeed);
    anim.setSpeed(nowspeed);
  }

  // getDuration
  const [duration, setduration] = useState();
  const [frames, setframes] = useState();
  const getDuration = (type?: boolean) => {
    const a = anim.getDuration(type);
    console.info(a);
    type ? setframes(a) : setduration(a);
  }

  //setdirection
  const [direction, setdirection] = useState(1);
  const setDirection = () => {
    let dr = direction > 0 ? -1 : 1
    setdirection(dr);
    anim.stop();
    anim.setDirection(dr);
    anim.play();
    setPlay(true);
    setnowFrame(0);
  }

  //goToAndPlay
  const goToAndPlay = () => {
    const half = Math.floor(anim.totalFrames / 2);
    console.info(half);
    setnowFrame(half);
    setPlay(true);
    anim.goToAndPlay(half, true);
  }

  //goToAndPlay
  const goToAndStop = () => {
    const half = Math.floor(anim.totalFrames / 2);
    console.info(half);
    setnowFrame(half);
    setPlay(false);
    anim.goToAndStop(half, true);
  }

  //playSegments
  const playSegments = (arr: Array<any>, type: boolean) => {
    anim.stop();
    anim.playSegments(arr, type);
    setPlay(true);
    setframes(10);
    getDuration(true);
    getDuration(false);
  }
  const destroyAnim = () => {
    anim.destroy();
  }

  return (
    <div className="detail_page">
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
          <div className="speed_wrap" onClick={() => getDuration(false)}>
            <span>{(duration && `动画时间：${duration} 秒`) || '点击获取动画时间'}</span>
          </div>
          <div className="speed_wrap" onClick={() => getDuration(true)}>
            <span>{(frames && `动画总帧数：${frames} 帧`) || '点击获取动画帧数'}</span>
          </div>
          <div className="speed_wrap" onClick={setDirection}>
            <span>{`点击改变动画方向  当前` + (direction < 0 ? '反向' : '正向')}</span>
          </div>
          <div className="speed_wrap" onClick={goToAndPlay}>
            <span>{`点击前进到动画的1/2帧 并继续播放`}</span>
          </div>
          <div className="speed_wrap" onClick={goToAndStop}>
            <span>{`点击前进到动画的1/2帧 并停止播放`}</span>
          </div>
          <div className="speed_wrap" onClick={() => playSegments([0, 10], false)}>
            <span>{`点击播放第0帧到第10帧动画 等待当前动画完成后执行`}</span>
          </div>
          <div className="speed_wrap" onClick={() => playSegments([0, 10], true)}>
            <span>{`点击播放第0帧到第10帧动画 立即执行`}</span>
          </div>
          <div className="speed_wrap" onClick={destroyAnim}>
            <span>{`移除动画`}</span>
          </div>
        </div>
      }
    </div>
  );
}

export default Detail;