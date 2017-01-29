import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {activateOverlay} from 'redux/reducers/overlay';
import {
  App,
  FrameDesign,
  FrameDownload,
  FramePicker,
  Galleries,
  Gallery,
  Intro,
  NotFound,
  Player,
  Profile,
  Submission,
} from 'containers';

export default (store) => {
  const checkLogin = (nextState) => {
    const { auth } = store.getState();
    if (nextState.location.pathname === '/profile' && !auth.user) {
      store.dispatch(activateOverlay('login'));
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Intro}/>
      <Route path="galleries" components={Galleries}/>
      <Route path="galleries/:galleryId" components={Gallery}/>
      <Route path="frame/:frameNumber">
        <Route path="submission/:submissionId" components={Submission}/>
      </Route>
      { /* Catch all route */ }
      <Route path="*" components={NotFound} status={404} />
    </Route>
  );
};
