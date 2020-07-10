import React, { FC } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import "./list.scss";

const List: FC<Lotties> = (list) => {
  const lotties = list.lotties;
  return (
    <div>
      <ul>
        {lotties.map((item) => (
          <li key={item.id}>
            <Link
              to={{
                pathname: `/detail`,
                search: queryString.stringify(item),
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default List;
