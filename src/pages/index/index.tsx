import React from "react";
import "./index.scss";
import lottieList from "../../assets//lottieFiles/lottieInfo";

import PageHead from "../../components/pagehead/pagehead";
import List from "../../components/list/list";

const Index: React.FC = () => {
  return (
    <div className="index_page">
      <PageHead></PageHead>
      <List lotties={lottieList}></List>

      <div
        className="tip"
        onClick={() => {
          window.open("https://lottiefiles.com/featured");
        }}
      >
        获取最新Lottie动画
      </div>
    </div>
  );
};

export default Index;
