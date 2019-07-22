import React, { FC } from 'react';

import './list.scss';

const List: FC<Lotties> = (list) => {
  const lotties = list.lotties
  const toQuickApp = () => {
    window.location.href = 'hap://app/com.calendar.dym';
  }
  return (
    <div>
      <ul>
        {lotties.map(item =>
          <li key={item.id}>{item.name}</li>
        )}
      </ul>
      <a className="link" href="hap://app/com.calendar.dym">To Quick App</a>
      <div className="link" onClick={toQuickApp}>To Quick App</div>
    </div>
  );
}
export default List;