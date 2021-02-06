import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';

const ROUTES_CONFIGS = [...routes.entries()].map(([rid, value]) => ({ rid, ...value }))

const App = () => (
  <Router>
    <Switch>
      {ROUTES_CONFIGS.map(({ rid, ...props }) => <Route key={rid} {...props} />)}
    </Switch>
  </Router>
)
export default App
