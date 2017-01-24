import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
// import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from 'redux/reducers/profile';
import {
  Icon,
  PromptConfirm,
  UserDownloadedList,
  UserSubmittedList,
  CheckboxToggle,
} from 'components';
import './Profile.less';

@connect(state => ({
  notification: state.profile.notification,
  activeSection: state.profile.activeSection,
  settingsVisible: state.profile.settingsVisible,
  promptVisible: state.profile.promptVisible,
  receivesEmail: state.profile.user.receivesEmail,
  user: state.auth.user,
}),
  dispatch => bindActionCreators(profileActions, dispatch)
)
export default class Profile extends Component {
  static propTypes = {
    activeSection: PropTypes.string.isRequired,
    endNotification: PropTypes.func.isRequired,
    toggleEmail: PropTypes.func.isRequired,
    notification: PropTypes.string,
    showDownloads: PropTypes.func.isRequired,
    showSubmissions: PropTypes.func.isRequired,
    startNotification: PropTypes.func.isRequired,
    showPrompt: PropTypes.func.isRequired,
    showSettings: PropTypes.func.isRequired,
    settingsVisible: PropTypes.bool.isRequired,
    promptVisible: PropTypes.bool.isRequired,
    receivesEmail: PropTypes.bool.isRequired,
    user: PropTypes.object,
  };

  getProfileClasses() {
    const classes = ['Profile'];
    if (this.props.settingsVisible) {
      classes.push('settings-active');
    }
    return classes.join(' ');
  }

  isButtonActive(section) {
    return this.props.activeSection === section ? `active ${section}` : section;
  }

  notificationClasses() {
    const classes = ['notification'];
    if (this.props.notification) classes.push('active');
    if (this.props.user) {
      if (this.props.user.downloads && !this.props.user.downloads.length) classes.push('no-downloads');
      if (this.props.user.submissions && !this.props.user.submissions.length) classes.push('no-submissions');
    }
    return classes.join(' ');
  }

  notifyMessage(messageName) {
    const messages = {
      settings: 'This is the settings button',
    };
    this.props.startNotification(messages[messageName]);
    window.setTimeout(this.props.endNotification, 3000);
  }
  createNewDownload() {
    console.log('TODO: reroute to create-new DOWNLOAD UI');
  }
  createNewUpload() {
    console.log('TODO: reroute to create-new UPLOAD UI');
  }
  deleteAccount() {
    console.log('DELETE ACCOUNT');
  }

  render() {
    const promptGroups = {
      delete: {
        title: 'Are you sure?',
        body: 'Deleting your account will remove lorem ipsum dolor cit ege t felis facilisis aliquam portitor.',
        confirm: 'Delete',
        action: this.deleteAccount,
        show: this.props.promptVisible,
        cancel: this.props.showPrompt
      }
    };
    const {activeSection, user} = this.props;
    return (
      <section className={this.getProfileClasses()}>
        <Helmet title="Profile"/>
        <div className={`prompt-overlay overlay ${this.props.promptVisible && 'active'}`} onClick={this.props.showPrompt}></div>
        <PromptConfirm options={promptGroups.delete}/>
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
        <div className={`menu-overlay overlay ${this.props.settingsVisible && 'active'}`} onClick={this.props.showSettings}></div>
        <header>
          <div className={this.notificationClasses()}>
            <div className="container">
              {this.props.notification}
            </div>
          </div>
          { user &&
              <div className="user-container">
                <figure
                  className="photo"
                  style={{backgroundImage: `url(${user.picture})`}}>
                </figure>
                <h2>{user.first_name} {user.last_name}</h2>
                <h4>{user.city}</h4>
              </div>
          }
          <button onClick={this.props.showSettings} className="settings">
            <Icon name="gear"/>
          </button>
        </header>
        { user &&
            <main>
              <nav className="profile-section">
                <div className={`container ${!user.downloads && 'no-results'}`}>
                  <button
                    className={this.isButtonActive('submissions')}
                    onClick={this.props.showSubmissions}>
                    My Submissions
                  </button>
                  <button
                    className={this.isButtonActive('downloads')}
                    onClick={this.props.showDownloads}>
                    My Downloads
                  </button>
                </div>
              </nav>
              <div className="container user-images-container">
                <div className="downloads">
                  { activeSection === 'downloads' &&
                      <UserDownloadedList assets={user.downloads} callback={this.createNewDownload}/>
                  }
                </div>
                <div className="submissions">
                  { activeSection === 'submissions' &&
                      <UserSubmittedList assets={user.submissions} callback={this.createNewUpload}/>
                  }
                </div>
              </div>
            </main>
        }
      </section>
    );
  }
}
