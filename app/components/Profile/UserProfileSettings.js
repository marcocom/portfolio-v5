import React, {Component, PropTypes} from 'react';
import Icon from 'components';
import CheckboxToggle from './CheckboxToggle';

export default class UserProfileSettings extends Component {
  static propTypes = {
    showSettings: PropTypes.func.isRequired,
    toggleEmail: PropTypes.func.isRequired,
    showPrompt: PropTypes.func.isRequired,
    receivesEmail: PropTypes.bool.isRequired,
  };
  render() {
    return (
      <aside className="settings-menu">
        <div className="header">
          <div className="title" onClick={this.props.showSettings}>
            <Icon name="arrow-back"/>
            <h1>Account Settings</h1>
          </div>
          <p>Lorem ipsum dolor sit amet. consequtor aleph dominum it.</p>
        </div>
        <CheckboxToggle callToAction={this.props.toggleEmail} isTrue={this.props.receivesEmail} optionTitle={'Receive email notifications'}/>
        <button>
          <h5 onClick={this.props.showPrompt}>Delete My Account</h5>
        </button>
      </aside>
    );
  }
}
