import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC<any> = function () {
  return (
    <div>
      <h3>Not found</h3>
      <Link to="/">回到首页</Link>
    </div>
  )
}
export default NotFound;