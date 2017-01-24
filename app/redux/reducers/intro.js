const INCREMENT_ACTIVE_FRAME = 'intro/INCREMENT_ACTIVE_FRAME';

const defaultIntroState = {
  activeFrame: 1,
  numberOfFrames: 14,
};

export function incrementActiveFrame() {
  return {
    type: INCREMENT_ACTIVE_FRAME,
  };
}

export default function intro(state = defaultIntroState, action = {}) {
  switch (action.type) {
    case INCREMENT_ACTIVE_FRAME:
      return {
        ...state,
        activeFrame: state.activeFrame + 1 > state.numberOfFrames ? 1 : state.activeFrame + 1,
      };
    default:
      return state;
  }
}
