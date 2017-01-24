import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import clientMiddleware from 'redux/middleware/clientMiddleware';
import reducers from 'redux/reducers';

export default function createStore(history, client, data) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [clientMiddleware(client), reduxRouterMiddleware];

  let finalCreateStore;
  if (process.env.NODE_ENV === 'development') {
    const {persistState} = require('redux-devtools');
    const DevTools = require('containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducers, data);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers);
    });
  }

  return store;
}
