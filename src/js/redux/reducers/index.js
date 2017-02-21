import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import auth from './auth';
import frames from './frames';
import intro from './intro';
import overlay from './overlay';

export default combineReducers({
  // auth,
  frames,
  intro,
  overlay,
  routing: routerReducer,
});
