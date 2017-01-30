import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {activateOverlay} from 'redux/reducers/overlay';
import {
  App,
  Galleries,
  Gallery,
  Intro,
  NotFound,
  Submission,
} from 'containers';
export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Intro}/>
      <Route path="galleries" components={Galleries}/>
      <Route path="galleries/:galleryId" components={Gallery}/>
      <Route path="frame/:frameNumber">
        <Route path="submission/:submissionId" components={Submission}/>
      </Route>
      <Route path="*" components={NotFound} status={404} />
    </Route>
  );
};
