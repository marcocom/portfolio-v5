import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
  App,
  Galleries,
  Gallery,
  Intro,
  NotFound,
  Submission,
} from 'containers';
function onRouteChange(e) {
  console.log('ONROUTECHANGE - e:', e);
}
export default () =>
  (
    <Route path="/" component={App} onChange={onRouteChange}>
      <IndexRoute component={Intro} />
      <Route path="galleries" components={Galleries} />
      <Route path="galleries/:galleryId" components={Gallery} />
      <Route path="frame/:frameNumber">
        <Route path="submission/:submissionId" components={Submission} />
      </Route>
      <Route path="*" components={NotFound} status={404} />
    </Route>
);
