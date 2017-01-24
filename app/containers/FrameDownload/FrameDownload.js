import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Frame, Icon} from 'components';
import * as FrameActions from 'redux/reducers/frames';
import './FrameDownload.less';

@connect(
  state => ({ frame: state.frames.activeFrame }),
  dispatch => bindActionCreators(FrameActions, dispatch),
)
export default class FrameDownload extends Component {
  static propTypes = {
    frame: PropTypes.object,
    getActiveFrame: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (!this.props.frame) {
      this.props.getActiveFrame(this.props.params.frameNumber);
    }
  }

  render() {
    const { frame } = this.props;
    return (
      <section className="frameDownload">
        <Helmet title="Frame"/>
        <div className="container">
          {frame &&
              <Frame data={frame}/>
          }
          <h1>Design Guidelines</h1>
          <p className="no-border">By participating, I agree to adhere to the following guidelines:</p>
          <Icon name="Submission_guideline_01"/>
          <p><strong>Do not</strong> include professional team or athlete names, imagery, or icons</p>
          <Icon name="Submission_guideline_02"/>
          <p><strong>Do not</strong> include profane or offensive words, imagery, or symbols </p>
          <Icon name="Submission_guideline_03"/>
          <p><strong>Do not</strong> alter the scale or placement of Brady within each frame</p>
          <p>All images incorporated into design must be owned by user</p>
          {frame &&
              <nav className="buttons">
                <Link to={`/frame/${frame.frameNumber}/design`}>
                  <button className="intel outline">Design Frame with Editor</button>
                </Link>
                <a href={frame.images.w1920} download={`brady-frame-${frame.frameNumber}.png`}>
                  <button className="intel blue">Download Frame #{this.props.frame.frameNumber}</button>
                </a>
              </nav>
          }
        </div>
      </section>
    );
  }
}
