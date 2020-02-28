import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import app from './index'
import { createRoutes } from '../utils/router'
import config from './config'

function RouterConfig ({ history }) {
  return (
    <Router history={history}>
      {createRoutes(app, config)}
    </Router>
  );
}
export default RouterConfig;
