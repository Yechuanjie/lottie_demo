import React from 'react';
import './index.scss';
import lottieList from '../../assets//lottieFiles/lottieInfo';

import PageHead from '../../components/pagehead/pagehead';
import List from '../../components/list/list';

const Index: React.FC = () => {
  return (
    <div className="index_page">
      <PageHead></PageHead>
      <List lotties={lottieList}></List>
    </div>
  );
}

export default Index;