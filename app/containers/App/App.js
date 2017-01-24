import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/reducers/auth';
import {Header, TabNav, Overlay} from 'components';
import config from 'config';
import 'theme/theme.less';

export default class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const intro = /^\/$/.exec(this.props.location.pathname);
    const editing = /frame.*design/.exec(this.props.location.pathname);
    return (
      <div className="experience-more-app">
        <Helmet {...config.app.head}/>
        <div className="app-container">
          { !editing && <Header/> }
          {this.props.children}
          { !intro && <TabNav/> }
        </div>
        <Overlay/>
      </div>
    );
  }
}
