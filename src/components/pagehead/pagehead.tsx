import React from 'react';
import { Link } from 'react-router-dom';
import './pagehead.scss';

const PageHead: React.FC = function () {
  return (
    <nav className="header">
      <Link to="/" >首页</Link>
      <Link to="/about">关于</Link>
      {/* <Link to="/detail/1">详情</Link> */}
    </nav>
  );
}

export default PageHead;