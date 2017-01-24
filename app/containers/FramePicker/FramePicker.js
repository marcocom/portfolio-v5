import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as FrameActions from 'redux/reducers/frames';
import {Frame} from 'components';
import './FramePicker.less';

@connect(
  state => ({
    loading: state.frames.pickerFramesLoading,
    pickerFrames: state.frames.pickerFrames,
  }),
  dispatch => bindActionCreators(FrameActions, dispatch)
)
export default class FramePicker extends Component {
  static propTypes = {
    getPickerFrames: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    newActiveFrame: PropTypes.func.isRequired,
    pickerFrames: PropTypes.array,
  };

  componentDidMount() {
    this.props.getPickerFrames();
  }

  selectFrame(frame) {
    this.props.newActiveFrame(frame);
    browserHistory.push(`/frame/${frame.frameNumber}/download`);
  }

  render() {
    return (
      <section className="FramePicker">
        <Helmet title="Frame Picker"/>
        <header>
          <div className="container">
            <h1>Choose A Frame</h1>
            <p>When it comes to Brady, there are no bad angles. Choose a frame below to start designing. Don’t see what you’re looking for? Browse the gallery to select a different frame.</p>
          </div>
        </header>
        <div className="choices">
          {this.props.loading &&
              <div>LOADING</div>
          }
          {this.props.pickerFrames.map(frame =>
            <Frame
              data={frame}
              key={frame.frameNumber}
              onClick={() => this.selectFrame(frame)}
              indicator
            />
          )}
        </div>
      </section>
    );
  }
}
