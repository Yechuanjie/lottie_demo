import React, { useContext } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom'
import Index from './index/index';
import About from './about/about';
import Detail from './detail/detail';
import NotFound from './404/404';
const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/about" component={About} />
        <Route exact path="/detail/:id" component={Detail} />
        {/* 404 */}
        <Route component={NotFound}></Route>
      </Switch>
    </HashRouter>
  );
}
// useContext(App);

export default App;
