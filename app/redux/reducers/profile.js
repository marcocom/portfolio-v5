const START_NOTIFICATION = 'profile/START_NOTIFICATION';
const END_NOTIFICATION = 'profile/END_NOTIFICATION';
const SHOW_SUBMISSIONS = 'profile/SHOW_SUBMISSIONS';
const SHOW_DOWNLOADS = 'profile/SHOW_DOWNLOADS';
const SHOW_SETTINGS = 'profile/SHOW_SETTINGS';
const UPDATE_EMAIL = 'profile/UPDATE_EMAIL_SETTINGS';
const SHOW_PROMPT = 'profile/SHOW_PROMPT';

const defaultState = {
  notification: undefined,
  activeSection: 'submissions',
  settingsVisible: false,
  user: {
    receivesEmail: true,
    submissions: [],
    downloads: [],
  },
  promptVisible: false,
};

export function startNotification(message) {
  return {
    type: START_NOTIFICATION,
    message,
  };
}
export function endNotification() {
  return {type: END_NOTIFICATION};
}
export function showSubmissions() {
  return {type: SHOW_SUBMISSIONS};
}
export function showDownloads() {
  return {type: SHOW_DOWNLOADS};
}
export function showSettings() {
  return {type: SHOW_SETTINGS};
}
export function toggleEmail() {
  return {type: UPDATE_EMAIL};
}
export function showPrompt() {
  return {type: SHOW_PROMPT};
}

export default function profile(state = defaultState, action = {}) {
  switch (action.type) {
    case START_NOTIFICATION:
      return {
        ...state,
        notification: action.message,
      };
    case END_NOTIFICATION:
      return {
        ...state,
        notification: undefined,
      };
    case SHOW_SUBMISSIONS:
      return {
        ...state,
        activeSection: 'submissions',
      };
    case SHOW_DOWNLOADS:
      return {
        ...state,
        activeSection: 'downloads',
      };
    case SHOW_SETTINGS:
      return {
        ...state,
        settingsVisible: !state.settingsVisible,
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        user: {...state.user, receivesEmail: !state.user.receivesEmail}
      };
    case SHOW_PROMPT:
      return {
        ...state,
        promptVisible: !state.promptVisible,
      };
    default:
      return state;
  }
}
