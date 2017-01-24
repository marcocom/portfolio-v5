import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {Image, SubmissionList} from 'components';
import * as FrameActions from 'redux/reducers/frames';
import * as OverlayActions from 'redux/reducers/overlay';
import './Submission.less';

@connect(
  state => ({
    frame: state.frames.activeFrame,
    submission: state.frames.activeSubmission,
    relatedSubmissions: state.frames.relatedSubmissions
  }),
  dispatch => bindActionCreators(Object.assign({}, FrameActions, OverlayActions), dispatch)
)
export default class Submission extends Component {
  static propTypes = {
    activateShareOverlay: PropTypes.func.isRequired,
    frame: PropTypes.object,
    getSubmissionDetailItems: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    newActiveFrame: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    submission: PropTypes.object,
    relatedSubmissions: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { frameNumber, submissionId } = this.props.params;
    this.props.getSubmissionDetailItems({ frameNumber, submissionId });
  }

  selectFrame(frame) {
    this.props.newActiveFrame(frame);
    browserHistory.push(`/frame/${frame.frameNumber}/download`);
  }

  render() {
    const {
      frame,
      submission,
      relatedSubmissions,
      activateShareOverlay,
      location,
    } = this.props;
    return (
      <section className="submission-page">
        <Helmet title="Frame Submission"/>
        <figure className="submission">
          { submission &&
              <Image images={submission.images} sizes="(min-width: 960px) 960px, 100vw" alt="Brady Submission"/>
          }
        </figure>
        <div className="container">
          <div className="original-frame">
            { frame &&
                <Image images={frame.images} sizes="250px" alt={`Frame ${frame.frameNumber}`}/>
            }
            { submission &&
                <div className="text">
                  <h2 className="name">Frame {submission.frameNumber}</h2>
                  <h2>{submission.author}</h2>
                  <h2>{submission.location}</h2>
                </div>
            }
          </div>
          <nav>
            <button className="intel outline" onClick={() => activateShareOverlay({
              image: submission.images.w1920,
              link: `http://${window.location.host}${location.pathname}`,
              description: 'Description of the image'
            })}>
            Share Frame
          </button>
          <button className="intel blue" onClick={() => this.selectFrame(frame)}>
            Design Frame
          </button>
        </nav>
      </div>
      <header>
        <h1>Frame Renditions ({relatedSubmissions.length})</h1>
      </header>
      { relatedSubmissions.length > 0 &&
          <SubmissionList submissions={relatedSubmissions}/>
      }
    </section>
    );
  }
}
