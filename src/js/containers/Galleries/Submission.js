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
    activeFrame: state.frames.activeFrame,
    activeSubmission: state.frames.activeSubmission,
    relatedSubmissions: state.frames.relatedSubmissions
  }),
  dispatch => bindActionCreators(Object.assign({}, FrameActions, OverlayActions), dispatch)
)
export default class Submission extends Component {
  static propTypes = {
    activateShareOverlay: PropTypes.func.isRequired,
    getSubmissionDetailItems: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    newActiveFrame: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    relatedSubmissions: PropTypes.array.isRequired,
    activeFrame: PropTypes.object,
    activeSubmission: PropTypes.object,
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
      activeFrame,
      activeSubmission,
      relatedSubmissions,
      activateShareOverlay,
      location,
    } = this.props;
    return (
      <section className="submission-page">
        <Helmet title="Frame Submission" />
        <figure className="submission">
          { activeSubmission &&
              <Image images={activeSubmission.images} sizes="(min-width: 960px) 960px, 100vw" alt="Brady Submission" />
          }
        </figure>
        <div className="container">
          <div className="original-frame">
            { activeFrame &&
                <Image images={activeFrame.images} sizes="250px" alt={`Frame ${activeFrame.frameNumber}`} />
            }
            { activeSubmission &&
                <div className="text">
                  <h2 className="name">Frame {activeSubmission.frameNumber}</h2>
                  <h2>{activeSubmission.author}</h2>
                  <h2>{activeSubmission.location}</h2>
                </div>
            }
          </div>
          <nav>
            <button className="intel outline" onClick={() => activateShareOverlay({
              image: activeSubmission.images.w1920,
              link: `http://${window.location.host}${location.pathname}`,
              description: 'Description of the image'
            })}>
            Share Frame
          </button>
          <button className="intel blue" onClick={() => this.selectFrame(activeFrame)}>
            Design Frame
          </button>
        </nav>
      </div>
      <header>
        <h1>Frame Renditions ({relatedSubmissions.length})</h1>
      </header>
      { relatedSubmissions.length > 0 &&
          <SubmissionList submissions={relatedSubmissions} />
      }
    </section>
    );
  }
}
