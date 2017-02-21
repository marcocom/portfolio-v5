import config from 'config';
import {browserHistory} from 'react-router';

const CREATE_JPG = 'auth/CREATE_JPG';
const CREATE_JPG_FAIL = 'auth/CREATE_JPG_FAIL';
const CREATE_JPG_SUCCESS = 'auth/CREATE_JPG_SUCCESS';
const FB_AUTH = 'auth/FB_AUTH';
const FB_AUTH_FAIL = 'auth/FB_AUTH_FAIL';
const FB_AUTH_SUCCESS = 'auth/FB_AUTH_SUCCESS';
const GET_AWS_USER = 'auth/GET_AWS_USER';
const GET_AWS_USER_SUCCESS = 'auth/GET_AWS_USER_SUCCESS';
const GET_AWS_USER_FAIL = 'auth/GET_AWS_USER_FAIL';
const UPLOAD_JPG_PROGRESS = 'auth/UPLOAD_JPG_PROGRESS';
const UPLOAD_JPG = 'auth/UPLOAD_JPG';
const UPLOAD_JPG_FAIL = 'auth/UPLOAD_JPG_FAIL';
const UPLOAD_JPG_SUCCESS = 'auth/UPLOAD_JPG_SUCCESS';

function authenticateFacebook() {
  return {
    types: [FB_AUTH, FB_AUTH_SUCCESS, FB_AUTH_FAIL],
    promise: () => new Promise((resolve, reject) => {
      window.FB.getLoginStatus(checkAuthResponse => {
        // the user is logged in
        if (checkAuthResponse.status === 'connected') {
          return resolve(checkAuthResponse.authResponse);
        }
        // user has not authed app or
        // is not logged into facebook
        return window.FB.login(loginResponse => {
          // user is logged in via facebook
          if (loginResponse.authResponse) {
            return resolve(loginResponse.authResponse);
          }
          // user cancelled login or did not authorize
          return reject(loginResponse);
        }, {scope: 'email, user_location'});
      });
    })
  };
}

function getAWSUser(fbAuthResponse) {
  return {
    types: [GET_AWS_USER, GET_AWS_USER_SUCCESS, GET_AWS_USER_FAIL],
    promise: (client) => client.get({
      service: 'user',
      headers: {
        Authorization: fbAuthResponse.accessToken,
      },
    })
  };
}

export function login({ redirect, after } = {}) {
  return dispatch => dispatch(authenticateFacebook())
    .then(fbAuthResponse => dispatch(getAWSUser(fbAuthResponse)))
    .then(user => {
      if (after) { after(user); }
      if (redirect) { browserHistory.push(redirect); }
    });
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
        params: { Bucket: config.uploadBuckets.submissions }
      });
      s3.upload({
        Key: imageName,
        Body: imageData,
        ContentType: 'image/jpeg',
        Metadata: metadata,
      }).on('httpUploadProgress', event => dispatch({
        type: UPLOAD_JPG_PROGRESS,
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

const defaultState = {
  loading: false,
  uploadProgress: 0,
  uploadingJpg: false,
};
export default function auth(state = defaultState, action = {}) {
  switch (action.type) {
    case FB_AUTH:
      return {
        ...state,
        loading: true,
      };
    case FB_AUTH_SUCCESS:
      return {
        ...state,
        accessToken: action.result.accessToken,
      };
    case FB_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPLOAD_JPG:
      return {
        ...state,
        loading: true,
        uploadingJpg: true,
      };
    case UPLOAD_JPG_PROGRESS:
      return {
        ...state,
        uploadProgress: action.progress,
      };
    case UPLOAD_JPG_SUCCESS:
      return {
        ...state,
        uploadProgress: 0,
        uploadingJpg: false,
        loading: false,
      };
    case GET_AWS_USER_SUCCESS:
      return {
        ...state,
        user: action.result
      };
    default:
      return state;
  }
}
