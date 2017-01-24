import colr from 'colr';
import undoable from 'redux-undo';
import {browserHistory} from 'react-router';
import { combineReducers } from 'redux';

const CLEAR_CANVAS = 'editor/CLEAR_CANVAS';
const CREATE_JPG = 'editor/CREATE_JPG';
const CREATE_JPG_SUCCESS = 'editor/CREATE_JPG_SUCCESS';
const CREATE_JPG_FAIL = 'editor/CREATE_JPG_FAIL';
const FB_AUTH = 'auth/FB_AUTH';
const INCREMENT_ZOOM = 'editor/INCREMENT_ZOOM';
const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
const NEW_DRAWING = 'artwork_controls/NEW_DRAWING';
const S3_UPLOAD_PROGRESS = 'artwork_controls/S3_UPLOAD_PROGRESS';
const SELECT_BACKGROUND = 'editor/SELECT_BACKGROUND';
const TOGGLE_BACKGROUND_PROMPT = 'editor/TOGGLE_BACKGROUND_PROMPT';
const TOGGLE_CONTROLS = 'editor/TOGGLE_CONTROLS';
const TOGGLE_DELETE_PROMPT = 'editor/TOGGLE_DELETE_PROMPT';
const UPDATE_BRUSH_COLOR = 'artwork_controls/UPDATE_BRUSH_COLOR';
const UPDATE_BRUSH_SIZE = 'artwork_controls/UPDATE_BRUSH_SIZE';
const UPDATE_BRUSH_TYPE = 'editor/UPDATE_BRUSH_TYPE';
const UPLOAD_JPG = 'editor/UPLOAD_JPG';
const UPLOAD_JPG_FAIL = 'editor/UPLOAD_JPG_FAIL';
const UPLOAD_JPG_SUCCESS = 'editor/UPLOAD_JPG_SUCCESS';

const defaultBrushState = {
  backgroundPromptOpen: false,
  brightness: 77,
  color: 'rgba(0,113,197,1)',
  colorPanelBackgroundColor: 'rgb(0, 146, 255)',
  controlsOpen: false,
  deletePromptVisible: false,
  hue: 206,
  opacity: 100,
  saturation: 100,
  size: 30,
  submitting: false,
  type: 'Pencil',
  value: 77.3,
  uploadProgress: 0,
  uploadingJpg: false,
  zoom: document.body.clientWidth / 1920,
};
function addRGBAColor(state) {
  const hue = parseInt(state.hue, 10);
  const saturation = parseInt(state.saturation, 10);
  const brightness = parseInt(state.brightness, 10);
  const opacity = parseInt(state.opacity, 10);
  const rgb = colr.fromHsv(hue, saturation, brightness).toRgbObject();
  const panelBg = colr.fromHsv(hue, 100, 100).toRgbObject();
  return {
    ...state,
    hue,
    saturation,
    brightness,
    opacity,
    color: `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity / 100})`,
    colorPanelBackgroundColor: `rgb(${panelBg.r},${panelBg.g},${panelBg.b})`,
  };
}
function brush(state = defaultBrushState, action = {}) {
  switch (action.type) {
    case CLEAR_CANVAS:
      return {
        ...state,
        deletePromptVisible: false,
      };
    case INCREMENT_ZOOM:
      return {
        ...state,
        zoom: state.zoom + action.amount,
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        controlsOpen: false,
      };
    case SELECT_BACKGROUND:
      return {
        ...state,
        backgroundPromptOpen: false,
        background: action.background,
      };
    case TOGGLE_CONTROLS:
      return {
        ...state,
        backgroundPromptOpen: false,
        controlsOpen: !state.controlsOpen,
      };
    case TOGGLE_DELETE_PROMPT:
      return {
        ...state,
        deletePromptVisible: !state.deletePromptVisible,
      };
    case TOGGLE_BACKGROUND_PROMPT:
      return {
        ...state,
        controlsOpen: false,
        backgroundPromptOpen: !state.backgroundPromptOpen,
      };
    case NEW_DRAWING:
      return {
        ...state,
        controlsOpen: false,
      };
    case UPDATE_BRUSH_COLOR:
      return addRGBAColor(Object.assign({}, state, action.colorOptions));
    case UPDATE_BRUSH_SIZE:
      return {
        ...state,
        size: action.size,
      };
    case UPDATE_BRUSH_TYPE:
      return {
        ...state,
        type: action.brushType,
      };
    case FB_AUTH:
      return {
        ...state,
        submitting: true,
      };
    case UPLOAD_JPG:
      return {
        ...state,
        uploadingJpg: true,
      };
    case S3_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.progress,
      };
    case UPLOAD_JPG_SUCCESS:
      return {
        ...state,
        uploadProgress: 0,
        uploadingJpg: false,
        submitting: false,
      };
    default:
      return state;
  }
}

export function updateBrushColor(options) {
  return {
    type: UPDATE_BRUSH_COLOR,
    colorOptions: options,
  };
}
export function updateBrushSize(newSize) {
  return {
    type: UPDATE_BRUSH_SIZE,
    size: parseInt(newSize, 10)
  };
}
export function updateBrushType(type) {
  return {
    type: UPDATE_BRUSH_TYPE,
    brushType: type,
  };
}
export function selectBackground(files) {
  if (files.length < 1) { return false; }
  return {
    type: SELECT_BACKGROUND,
    background: files[0].preview,
  };
}
export function toggleControls() {
  return {
    type: TOGGLE_CONTROLS,
  };
}
export function toggleBackgroundPrompt() {
  return {
    type: TOGGLE_BACKGROUND_PROMPT,
  };
}
export function toggleDeletePrompt() {
  return {
    type: TOGGLE_DELETE_PROMPT,
  };
}
export function incrementZoom(amount) {
  return {
    type: INCREMENT_ZOOM,
    amount,
  };
}

const defaultDrawingsState = {
  drawings: {},
};
export function newDrawing({ drawings }) {
  return {
    type: NEW_DRAWING,
    drawings,
  };
}
export function clearCanvas() {
  return {
    type: CLEAR_CANVAS,
  };
}

function getJpgFromCanvas(jpgDataPromise) {
  return {
    types: [CREATE_JPG, CREATE_JPG_SUCCESS, CREATE_JPG_FAIL],
    promise: jpgDataPromise,
  };
}
function uploadJpgToS3({ imageData, imageName, metadata, dispatch }) {
  return {
    types: [UPLOAD_JPG, UPLOAD_JPG_SUCCESS, UPLOAD_JPG_FAIL],
    promise: () => new Promise((resolve, reject) => {
      const s3 = new window.AWS.S3({
        params: { Bucket: 'submissions-source-dev' }
      });
      s3.upload({
        Key: imageName,
        Body: imageData,
        ContentType: 'image/jpeg',
        Metadata: metadata,
      }).on('httpUploadProgress', event => dispatch({
        type: S3_UPLOAD_PROGRESS,
        progress: parseInt((event.loaded * 100) / event.total, 10),
      })).send((err, data) => {
        if (err) {
          console.log('There was an error uploading your photo: ', err.message);
          return reject(err.message);
        }
        return resolve(data);
      });
    }),
  };
}
export function submit({ jpgDataPromise, imageName, metadata, redirect }) {
  return dispatch => dispatch(getJpgFromCanvas(jpgDataPromise))
    .then(imageData => dispatch(uploadJpgToS3({ imageData, imageName, metadata, dispatch })))
    .then(() => {
      if (redirect) { browserHistory.push(redirect); }
    });
}

function drawingsReducer(state = defaultDrawingsState, action = {}) {
  switch (action.type) {
    case CLEAR_CANVAS:
      return Object.assign({}, state, { objects: [] });
    case NEW_DRAWING:
      return {
        ...state,
        drawings: action.drawings,
      };
    default:
      return state;
  }
}
const drawings = undoable(drawingsReducer);

export default combineReducers({
  brush,
  drawings
});
