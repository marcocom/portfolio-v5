import 'babel-polyfill';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import React from 'react';
import ReactDOM from 'react-dom';
import apiClient from 'redux/apiClient';
import createStore from 'redux/createStore';
import getRoutes from './routes';

const store = createStore(browserHistory, apiClient);
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Router
    history={history}
    routes={getRoutes(store)}
    render={applyRouterMiddleware(useScroll((prevRouterProps, { location }) => {
      if (prevRouterProps && location.pathname !== prevRouterProps.location.pathname) {
        return [0, 0];
      }
      return true;
    }))}
  />
);

ReactDOM.render(
  <Provider store={store} key="provider">
    { router }
    
  </Provider>,
  document.getElementById('app')
);

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
