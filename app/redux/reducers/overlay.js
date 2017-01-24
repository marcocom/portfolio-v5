const ACTIVATE_OVERLAY = 'overlays/ACTIVATE_OVERLAY';
const ACTIVATE_SHARE_OVERLAY = 'overlays/ACTIVATE_SHARE_OVERLAY';
const CLOSE_OVERLAY = 'overlays/CLOSE_OVERLAY';
const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export function closeOverlay() {
  return {
    type: CLOSE_OVERLAY,
  };
}
export function activateOverlay(overlayName) {
  return {
    type: ACTIVATE_OVERLAY,
    name: overlayName,
  };
}
export function activateShareOverlay({ image, link, description }) {
  return {
    type: ACTIVATE_SHARE_OVERLAY,
    image,
    link,
    description,
  };
}

export default function overlay(state = {}, action = {}) {
  switch (action.type) {
    case ACTIVATE_OVERLAY:
      return {
        ...state,
        activeOverlay: action.name,
      };
    case ACTIVATE_SHARE_OVERLAY:
      return {
        ...state,
        activeOverlay: 'share',
        shareImage: action.image,
        shareLink: action.link,
        shareDescription: action.description,
      };
    case CLOSE_OVERLAY:
      return {
        ...state,
        activeOverlay: undefined,
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        activeOverlay: undefined,
      };
    default:
      return state;
  }
}
