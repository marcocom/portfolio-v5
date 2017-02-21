import 'babel-polyfill';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import React from 'react';
import ReactDOM from 'react-dom';
import apiClient from 'redux/apiClient';
import createStore from 'redux/createStore';
import DevTools from './containers/DevTools/DevTools';
import getRoutes from './routes';

const store = createStore(browserHistory, apiClient);
// const history = syncHistoryWithStore(browserHistory, store);
const isProduction = process.env.NODE_ENV === 'production';

function renderReturn() {
  applyRouterMiddleware(useScroll((prevRouterProps, {location}) => !(prevRouterProps && location.pathname !== prevRouterProps.location.pathname) || [0, 0]));
}
const router = (
  /*
  <Router
    history={history}
    routes={getRoutes(store)}
    render={renderReturn}
  />
   */
  
  <Router
    history={browserHistory}
    routes={getRoutes(store)}
    render={renderReturn}
  />
);
ReactDOM.render(
  <Provider store={store} key="provider">
    { isProduction ?
      router :
      <div>
        router
        <DevTools />
      </div> }
    
  </Provider>,
  document.getElementById('app'),
);
/*
if (process.env.NODE_ENV === 'development' && !window.devToolsExtension) {
  window.React = React; // enable debugger
  const DevTools = require('containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
    <div>
      { router }
      <DevTools/>
    </div>
    </Provider>,
    document.getElementById('app')
  );
}
*/
