const GET_CATEGORY_SUBMISSIONS = 'galleries/GET_CATEGORY_SUBMISSIONS';
const GET_CATEGORY_SUBMISSIONS_FAIL = 'galleries/GET_CATEGORY_SUBMISSIONS_FAIL';
const GET_CATEGORY_SUBMISSIONS_SUCCESS = 'galleries/GET_CATEGORY_SUBMISSIONS_SUCCESS';
const GET_FRAME = 'frames/GET_FRAME';
const GET_FRAME_FAIL = 'frames/GET_FRAME_FAIL';
const GET_FRAME_SUCCESS = 'frames/GET_FRAME_SUCCESS';
const GET_GALLERY_PREVIEWS = 'galleries/GET_GALLERY_PREVIEWS';
const GET_GALLERY_PREVIEWS_FAIL = 'galleries/GET_GALLERY_PREVIEWS_FAIL';
const GET_GALLERY_PREVIEWS_SUCCESS = 'galleries/GET_GALLERY_PREVIEWS_SUCCESS';
const GET_SUBMISSION_DETAILS = 'galleries/GET_SUBMISSION_DETAILS';
const GET_SUBMISSION_DETAILS_FAIL = 'galleries/GET_SUBMISSION_DETAILS_FAIL';
const GET_SUBMISSION_DETAILS_SUCCESS = 'galleries/GET_SUBMISSION_DETAILS_SUCCESS';
const GET_PICKER_FRAMES = 'frames/GET_PICKER_FRAMES';
const GET_PICKER_FRAMES_FAIL = 'frames/GET_PICKER_FRAMES_FAIL';
const GET_PICKER_FRAMES_SUCCESS = 'frames/GET_PICKER_FRAMES_SUCCESS';
const NEW_ACTIVE_FRAME = 'frames/NEW_ACTIVE_FRAME';
const UPDATE_LAYOUT_FORMAT = 'galleries/UPDATE_LAYOUT_FORMAT';

const initialState = {
  activeFrame: null,
  activeSubmission: null,
  categorySubmissions: [],
  categorySubmissionsLoading: false,
  galleryPreviews: {},
  layoutFormat: 'grid',
  pickerFrames: [],
  pickerFramesLoading: false,
  relatedSubmissions: [],
};

export function getActiveFrame(frameNumber) {
  return {
    types: [GET_FRAME, GET_FRAME_SUCCESS, GET_FRAME_FAIL],
    promise: client => client.get({
      service: 'frames',
      path: `/frame?frameNumber=${frameNumber}`,
    })
  };
}

export function getCategorySubmissions(galleryId) {
  return {
    types: [GET_CATEGORY_SUBMISSIONS, GET_CATEGORY_SUBMISSIONS_SUCCESS, GET_CATEGORY_SUBMISSIONS_FAIL],
    promise: client => client.get({
      service: 'submissions',
      path: `/submissions?category=${galleryId.toUpperCase()}&status=APPROVED`,
    })
  };
}

export function getGalleryPreviewImages() {
  const categories = ['FAVORITES', 'FUNNIEST', 'ARTWORKS', 'WEIRD'];
  return {
    types: [GET_GALLERY_PREVIEWS, GET_GALLERY_PREVIEWS_SUCCESS, GET_GALLERY_PREVIEWS_FAIL],
    promise: client => Promise.all(categories.map(category => client.get({
      service: 'submissions',
      path: `/submissions?status=APPROVED&category=${category}&_limit=4`,
    })))
  };
}

export function getPickerFrames() {
  function getArrayOfUniqueFrameNumbers({ length }) {
    function getRandomIntInRange(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const frameNumbers = [];
    for (let i = 0; i < length; i++) {
      const attempt = getRandomIntInRange(1, 97);
      if (frameNumbers.indexOf(attempt) >= 0) {
        i--;
      } else {
        frameNumbers.push(attempt);
      }
    }
    return frameNumbers;
  }
  const frameNumbers = getArrayOfUniqueFrameNumbers({ length: 3 });
  return {
    types: [GET_PICKER_FRAMES, GET_PICKER_FRAMES_SUCCESS, GET_PICKER_FRAMES_FAIL],
    promise: client => client.get({
      service: 'frames',
      path: `/frame?frameNumber=${frameNumbers.join('&frameNumber=')}`,
    })
  };
}

export function getSubmissionDetailItems({ frameNumber, submissionId }) {
  return {
    types: [GET_SUBMISSION_DETAILS, GET_SUBMISSION_DETAILS_SUCCESS, GET_SUBMISSION_DETAILS_FAIL],
    promise: client => Promise.all([
      client.get({
        service: 'submissions',
        path: `/submissions?submissionId=${submissionId}`,
      }),
      client.get({
        service: 'frames',
        path: `/frame?frameNumber=${frameNumber}`,
      }),
      client.get({
        service: 'submissions',
        path: `/submissions?status=APPROVED&frameNumber=${frameNumber}`,
      }),
    ])
  };
}

export function newActiveFrame(activeFrame) {
  return {
    type: NEW_ACTIVE_FRAME,
    activeFrame,
  };
}

export function updateLayoutFormat(format) {
  return {
    type: UPDATE_LAYOUT_FORMAT,
    format,
  };
}

export default function frames(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CATEGORY_SUBMISSIONS:
      return {
        ...state,
        categorySubmissionsLoading: true,
      };
    case GET_CATEGORY_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        categorySubmissions: action.result,
        categorySubmissionsLoading: false,
      };
    case GET_FRAME_SUCCESS:
      return {
        ...state,
        activeFrame: action.result[0],
      };
    case GET_GALLERY_PREVIEWS:
      return {
        ...state,
        loadingGalleries: true,
      };
    case GET_GALLERY_PREVIEWS_SUCCESS:
      return {
        ...state,
        galleryPreviews: action.result.reduce((previews, submissionArray) => {
          if (submissionArray && submissionArray.length) {
            const categoryName = submissionArray[0].category.toLowerCase();
            return Object.assign(previews, {
              [categoryName]: submissionArray
            });
          }
          return previews;
        }, {}),
        loadingGalleries: false,
      };
    case GET_SUBMISSION_DETAILS:
      return {
        ...state,
        activeSubmission: null,
        relatedSubmissions: [],
      };
    case GET_SUBMISSION_DETAILS_SUCCESS:
      return {
        ...state,
        activeSubmission: action.result[0][0],
        activeFrame: action.result[1][0],
        relatedSubmissions: action.result[2],
      };
    case UPDATE_LAYOUT_FORMAT:
      return {
        ...state,
        layoutFormat: action.format,
      };
    case NEW_ACTIVE_FRAME:
      return {
        ...state,
        activeFrame: action.activeFrame
      };
    case GET_PICKER_FRAMES:
      return {
        ...state,
        loadingPickerFrames: true,
      };
    case GET_PICKER_FRAMES_SUCCESS:
      return {
        ...state,
        loadingPickerFrames: false,
        pickerFrames: action.result,
      };
    default:
      return state;
  }
}
