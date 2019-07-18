import React, { FC } from 'react';

import './list.scss';

const List: FC<Lotties> = (list) => {
  const lotties = list.lotties
  return (
    <ul>
      {lotties.map(item => 
        <li key={item.id}>{item.name}</li>
      )}
    </ul>
  );
}
export default List;