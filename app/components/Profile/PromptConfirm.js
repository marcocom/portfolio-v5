import React, {Component, PropTypes} from 'react';
import './PromptConfirm.less';

export default class PromptConfirm extends Component {

  static propTypes = {
    options: PropTypes.object.isRequired // TODO: this feels hack and bypasses strict type-checking and reqs, even if clean
  };

  render() {
    return (
      <div className={`alert-modal ${this.props.options.show && 'active'}`}>
        <div className="text-container">
            <h1>{ this.props.options.title }</h1>
            <p>{ this.props.options.body }</p>
        </div>
        <a className="btn btn-cancel" onClick={ this.props.options.cancel }>
          <h3>Cancel</h3>
        </a>
        <a className="btn btn-confirm" onClick={ this.props.options.action }>
          <h3>{ this.props.options.confirm }</h3>
        </a>
      </div>
    );
  }
}
