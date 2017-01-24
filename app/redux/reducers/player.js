const INCREMENT_ACTIVE_FRAME = 'player/INCREMENT_ACTIVE_FRAME';
const DECREMENT_ACTIVE_FRAME = 'player/DECREMENT_ACTIVE_FRAME';
const CHANGE_CURRENT_FRAME = 'player/CHANGE_CURRENT_FRAME';
const TOGGLE_PLAY_STATE = 'player/TOGGLE_PLAY_STATE';
const SCRUB_INTERACT_RELEASE = 'player/SCRUB_INTERACT_RELEASE';
const GET_FRAMES = 'player/GET_FRAMES';
const GET_FRAMES_SUCCESS = 'player/GET_FRAMES_SUCCESS';
const GET_FRAMES_FAIL = 'player/GET_FRAMES_FAIL';
const GET_NAVFRAMES = 'player/GET_FRAMES';
const GET_NAVFRAMES_SUCCESS = 'player/GET_FRAMES_SUCCESS';
const GET_NAVFRAMES_FAIL = 'player/GET_FRAMES_FAIL';

const defaultIntroState = {
  activeFrame: 1,
  playState: 0,
  totalFrames: 97,
  loading: true,
  isScrubbing: false,
  playBackSequence: [],
  navSequence: [],
};

export function getSequenceFrames() {
  return {
    types: [GET_FRAMES, GET_FRAMES_SUCCESS, GET_FRAMES_FAIL],
    promise: client => client.get({
      service: 'frames',
      path: `/submissions/?_limit=${defaultIntroState.totalFrames}`,
    })
  };
}
export function getNavFrames() {
  return {
    types: [GET_NAVFRAMES, GET_NAVFRAMES_SUCCESS, GET_NAVFRAMES_FAIL],
    promise: client => client.get({
      service: 'frames',
      path: `/navframes/?_limit=${defaultIntroState.totalFrames}`,
    })
  };
}

export function incrementActiveFrame() {
  return {
    type: INCREMENT_ACTIVE_FRAME,
  };
}
export function decrementActiveFrame() {
  return {
    type: DECREMENT_ACTIVE_FRAME,
  };
}
export function changeFrame(goto) {
  return {
    type: CHANGE_CURRENT_FRAME,
    val: goto,
  };
}
export function swapPlayState() {
  return {
    type: TOGGLE_PLAY_STATE,
  };
}
export function scrubRelease(val) {
  return {
    type: SCRUB_INTERACT_RELEASE,
    goto: val,
  };
}

export default function player(state = defaultIntroState, action = {}) {
  switch (action.type) {
    case INCREMENT_ACTIVE_FRAME:
      return {
        ...state,
        activeFrame: ((state.activeFrame + 1) > state.totalFrames) ? 1 : state.activeFrame + 1,
      };
    case DECREMENT_ACTIVE_FRAME:
      return {
        ...state,
        activeFrame: ((state.activeFrame - 1) < 0) ? state.totalFrames : (state.activeFrame - 1),
      };
    case CHANGE_CURRENT_FRAME:
      return {
        ...state,
        activeFrame: action.val,
        playState: 0,
      };
    case TOGGLE_PLAY_STATE:
      return {
        ...state,
        playState: (state.playState === 1 ? 0 : 1),
      };
    case SCRUB_INTERACT_RELEASE:
      return {
        ...state,
        activeFrame: action.goto,
        isScrubbing: false,
      };
    case GET_FRAMES:
      return {
        ...state,
        loading: true,
      };
    case GET_NAVFRAMES:
      return {
        ...state,
        loading: true,
      };
    case GET_FRAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        playBackSequence: action.result,
      };
    case GET_NAVFRAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        navSequence: action.result,
      };
    case GET_NAVFRAMES_FAIL:
      return {
        ...state,
        loading: false,
        navSequence: Object.assign({}, state.playBackSequence), // fallback to already loaded sequence images
      };
    default:
      return state;
  }
}
