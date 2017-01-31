import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'components';
import './MainNav.less';

export default class MainNav extends Component {
  render() {
    return (
      <nav className="TabBar">
        <Link to="/galleries" className="browse" activeClassName="active">
          <Icon name="gear"/>
          <span>Gallery</span>
        </Link>
        <Link to="/player" className="player" activeClassName="active">
          <Icon name="gear"/>
          <span>Video</span>
        </Link>
        <Link to="/frame/select" className="design" activeClassName="active">
          <Icon name="gear"/>
          <span>Design</span>
        </Link>
        <Link to="/profile" className="profile" activeClassName="active">
          <Icon name="gear"/>
          <span>Profile</span>
        </Link>
      </nav>
    );
  }
}
