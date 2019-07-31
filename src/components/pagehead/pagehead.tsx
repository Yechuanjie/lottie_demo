import React from 'react';
import { Link } from 'react-router-dom';
import './pagehead.scss';

const PageHead: React.FC = function () {
  return (
    <nav className="header">
      <Link to="/" >Lottie Files</Link>
      {/* <Link to="/about">关于</Link> */}
    </nav>
  );
}

export default PageHead;