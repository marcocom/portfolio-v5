import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import editor from './editor';
import frames from './frames';
import intro from './intro';
import overlay from './overlay';
import profile from './profile';
import player from './player';

export default combineReducers({
  auth,
  editor,
  frames,
  intro,
  overlay,
  profile,
  player,
  routing: routerReducer,
});
