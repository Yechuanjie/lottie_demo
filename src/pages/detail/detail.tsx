import React, { useEffect, useState, useRef, useCallback } from "react";
import lottie, { AnimationItem } from "lottie-web";
import queryString from "query-string";

import startIcon from "../../assets/images/start.svg";
import pauseIcon from "../../assets/images/pause.svg";
import speedIcon from "../../assets/images/fast-forward.svg";

import "./detail.scss";

interface IProps {
  [props: string]: any;
}

type AnimationRealItem = AnimationItem & {
  totalFrames: number;
};

const Detail: React.FC<IProps> = (props) => {
  const parsed = queryString.parse(props.location.search);
  const { name, source } = parsed as {
    name: string;
    source: string;
  };
  const [lottieSourceUrl] = useState(source);
  // const [totalFrame, setTotalFrame] = useState(0);

  const [isLoading, setisLoading] = useState(false);
  /**
   * 加载远程json文件
   * @param {string} sourceurl
   * @returns 返回json对象
   */
  const loadResource = async (sourceurl: string) => {
    setisLoading(true);
    const response = await fetch(sourceurl);
    const data = await response.json();
    setisLoading(false);
    return data;
  };

  const [anim, setAnim] = useState({} as AnimationRealItem);
  const [nowFrame, setnowFrame] = useState(0);

  const isUnmounted = useRef(false);

  const init = useCallback((source: string): Promise<AnimationRealItem> => {
    return new Promise((resolve) => {
      /**
       *初始化动画
       * @param {JSON} animationData
       */
      const initLottieAnimation = async (animationData: JSON) => {
        const element = document.querySelector(".lottie_wrap");
        const lottieObject = (await lottie.loadAnimation({
          container: element as Element, // the dom element that will contain the animation
          renderer: "svg",
          name: name as string,
          loop: true,
          autoplay: true,
          animationData,
        })) as AnimationRealItem;
        return lottieObject;
      };
      loadResource(String(source)).then(async (json) => {
        const item = await initLottieAnimation(json);
        resolve(item);
      });
    });
  }, [name]);

  const initWithEvent = useCallback(
    (source: string) => {
      let item = {} as AnimationRealItem;
      init(source).then((res) => {
        item = res;
        res.addEventListener("enterFrame", handler);
        setAnim(res);
      });
      return () => {
        item.totalFrames > 0 && item.removeEventListener("enterFrame", handler);
      };
    },
    [init]
  );

  useEffect(() => {
    if (lottieSourceUrl) {
      initWithEvent(lottieSourceUrl);
    }
    return () => {
      isUnmounted.current = true;
    };
  }, [lottieSourceUrl, initWithEvent]);

  const handler = (i: { currentTime: number }) => {
    if (!isUnmounted.current) {
      setnowFrame(Math.floor(i.currentTime));
    }
  };

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
  };

  // getDuration
  const [duration, setduration] = useState(0);
  const [frames, setframes] = useState(0);
  const getDuration = (type?: boolean) => {
    const a = anim.getDuration(type);
    type ? setframes(a) : setduration(a);
  };

  //setdirection
  const [direction, setdirection] = useState(1);
  const setDirection = () => {
    let dr: 1 | -1 = direction > 0 ? -1 : 1;
    setdirection(dr);
    anim.stop();
    anim.setDirection(dr);
    anim.play();
    setPlay(true);
    setnowFrame(0);
  };

  //goToAndPlay
  const goToAndPlay = () => {
    const half = Math.floor(anim.totalFrames / 2);
    console.info(half);
    setnowFrame(half);
    setPlay(true);
    anim.goToAndPlay(half, true);
  };

  //goToAndPlay
  const goToAndStop = () => {
    const half = Math.floor(anim.totalFrames / 2);
    console.info(half);
    setnowFrame(half);
    setPlay(false);
    anim.goToAndStop(half, true);
  };

  //playSegments
  const playSegments = (arr: Array<any>, type: boolean) => {
    anim.stop();
    anim.playSegments(arr, type);
    setPlay(true);
    setframes(10);
    getDuration(true);
    getDuration(false);
  };
  const [isdestory, setisdestory] = useState(false);
  const destroyAnim = () => {
    if (isdestory) {
      initWithEvent(source);
    } else {
      anim.destroy();
    }
    setisdestory(!isdestory);
  };

  const [showControl, setshowControl] = useState(false);
  const toggleControl = (e: any) => {
    e.preventDefault();
    setshowControl(!showControl);
  };

  return (
    <div className="detail_page">
      <div className="lottie_wrap" onClick={toggleControl}></div>
      {isLoading && (
        <div className="loading-mask">
          <div className="loading-round"></div>
          <div>加载中...</div>
        </div>
      )}
      <div className="tip">点击图层操控动画</div>
      {anim && (
        <div className={`control ${showControl ? "show" : ""}`}>
          <div className="play_wrap">
            <img
              className="play"
              onClick={togglePlay}
              src={isPlay ? pauseIcon : startIcon}
              alt="playcontrol"
            />
            <span>
              {nowFrame} / {anim.totalFrames}
            </span>
          </div>
          <div className="speed_wrap" onClick={changeSpeed}>
            <div className="speed_icon">
              <img src={speedIcon} alt="" />
              <span>动画速度</span>
            </div>
            <span className="speed">{speed}x</span>
          </div>
          <div className="speed_wrap" onClick={() => getDuration(false)}>
            <span>
              {(duration && `动画时间：${duration} 秒`) || "点击获取动画时间"}
            </span>
          </div>
          <div className="speed_wrap" onClick={() => getDuration(true)}>
            <span>
              {(frames && `动画总帧数：${frames} 帧`) || "点击获取动画帧数"}
            </span>
          </div>
          <div className="speed_wrap" onClick={setDirection}>
            <span>
              {`点击改变动画方向  当前` + (direction < 0 ? "反向" : "正向")}
            </span>
          </div>
          <div className="speed_wrap" onClick={goToAndPlay}>
            <span>{`点击前进到动画的1/2帧 并继续播放`}</span>
          </div>
          <div className="speed_wrap" onClick={goToAndStop}>
            <span>{`点击前进到动画的1/2帧 并停止播放`}</span>
          </div>
          <div
            className="speed_wrap"
            onClick={() => playSegments([0, 10], false)}
          >
            <span>{`点击播放第0帧到第10帧动画 等待当前动画完成后执行`}</span>
          </div>
          <div
            className="speed_wrap"
            onClick={() => playSegments([0, 10], true)}
          >
            <span>{`点击播放第0帧到第10帧动画 立即执行`}</span>
          </div>
          <div className="speed_wrap" onClick={destroyAnim}>
            <span>{isdestory ? `重建动画` : `销毁动画`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
