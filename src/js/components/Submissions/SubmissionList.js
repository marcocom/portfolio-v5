import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as FrameActions from 'redux/reducers/frames';
import {LayoutFormatNav} from 'components';
import {Link} from 'react-router';
import './SubmissionList.less';

@connect(
  state => ({ layoutFormat: state.frames.layoutFormat }),
  dispatch => bindActionCreators(FrameActions, dispatch)
)
export default class SubmissionList extends Component {
  static propTypes = {
    layoutFormat: PropTypes.string.isRequired,
    updateLayoutFormat: PropTypes.func.isRequired,
    submissions: PropTypes.array.isRequired,
  };
  render() {
    const {
      submissions,
      layoutFormat,
      updateLayoutFormat,
    } = this.props;
    const items = submissions.map((submission) =>
      <div key={submission.frameId} className="item">
        <Link to={`/frame/${submission.frameNumber}/submission/${submission.submissionId}`}>
          <figure className="image" style={{backgroundImage: `url(${submission.images.w480})`}} />
          <div className="info">
            <h2>{submission.author}</h2>
            <p>{submission.location}</p>
          </div>
        </Link>
      </div>
    );
    return (
      <div className={`submission-list ${layoutFormat}`}>
        <LayoutFormatNav layoutFormat={layoutFormat} updateLayoutFormat={updateLayoutFormat} />
        <div className="list">
          {items}
        </div>
      </div>
    );
  }
}
