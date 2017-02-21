import React, {Component, PropTypes} from 'react';
import {Icon} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as OverlayActions from 'redux/reducers/overlay';
import * as AuthActions from 'redux/reducers/auth';
import './Overlay.less';

@connect(state => ({
  activeOverlay: state.overlay.activeOverlay,
  shareImage: state.overlay.shareImage,
  shareLink: state.overlay.shareLink,
  shareDescription: state.overlay.shareDescription,
}),
  dispatch => bindActionCreators(Object.assign({}, OverlayActions, AuthActions), dispatch)
)
export default class Overlays extends Component {
  static propTypes = {
    activeOverlay: PropTypes.string,
    closeOverlay: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    shareImage: PropTypes.string,
    shareLink: PropTypes.string,
    shareDescription: PropTypes.string,
  };
  getOverlayClasses() {
    const classes = ['overlay'];
    if (this.props.activeOverlay) {
      classes.push('active');
    }
    return classes.join(' ');
  }
  shareToFacebook() {
    window.FB.ui({
      method: 'share',
      href: this.props.shareLink,
      quote: this.props.shareDescription,
    });
  }
  render() {
    return (
      <div className={this.getOverlayClasses()}>
        <button className="escape" onClick={this.props.closeOverlay}>
          <Icon name="X" />
        </button>

        { this.props.activeOverlay === 'login' &&
            <div className="content">
              <h1>Authenticate Yourself</h1>
              <p>Before we unleash your creativity all over the Internet, we need a few more details. Click below to speed things up.</p>
              <button className="intel white" onClick={() => this.props.login({ redirect: '/profile' })}>Continue with Facebook</button>
            </div>
        }

        { this.props.activeOverlay === 'share' &&
            <div className="content">
              <h1>Share This Frame</h1>
              <p>How nice are you! Help your friends #ExperienceMore by sharing this frame on social. Click below to spice up their newsfeeds.</p>
              <button className="intel white" onClick={() => this.shareToFacebook()}>Facebook</button>
              <a href={`https://twitter.com/home?status=%23ExperienceMore%20with%20Intel%20and%20Tom%20Brady%20${this.props.shareLink}`} target="_blank">
                <button className="intel white">Twitter</button>
              </a>
              <a href={`http://tumblr.com/widgets/share/tool?posttype=photo&content=${this.props.shareImage}&caption=${this.props.shareDescription}&canonicalUrl=${this.props.shareLink}`} target="_blank">
                <button className="intel white">Tumblr</button>
              </a>
              <a href={`https://pinterest.com/pin/create/button/?url=${this.props.shareLink}&media=${this.props.shareImage}&description=${this.props.shareDescription}`} target="_blank">
                <button className="intel white">Pinterest</button>
              </a>
            </div>
        }

        { this.props.activeOverlay === 'authenticated-email-optin' &&
            <div className="content">
              <h1>Stay Updated</h1>
              <p>By clicking yes, we’ll make sure you’re notified by email once your frame has been reviewed. If you deny, we understand but won’t be able to accept your frame submission.</p>
              <button className="intel blue">Yes. Notify Me.</button>
              <button className="intel outline">No. I Changed My Mind.</button>
            </div>
        }

      </div>
    );
  }
}
