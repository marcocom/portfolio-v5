import React, {Component, PropTypes} from 'react';
import './CheckboxToggle.less'; // shared

export default class CheckboxToggle extends Component {

  static propTypes = {
    callToAction: PropTypes.func.isRequired,
    optionTitle: PropTypes.string.isRequired,
    isTrue: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div className="settings-option">
        <h5 className="title">{this.props.optionTitle}</h5>
        <div className="toggle-switch" onClick={this.props.callToAction}>
          <div className={`switch-body ${this.props.isTrue}`}>
            <h5>{ this.props.isTrue ? 'Yes' : 'No' }</h5>
            <span className="background"></span>
            <span className="foreground"></span>
          </div>
        </div>
      </div>
    );
  }
}
