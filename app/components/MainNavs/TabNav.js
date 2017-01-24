import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'components';
import './TabNav.less';

export default class TabNav extends Component {
  render() {
    return (
      <nav className="TabBar">
        <Link to="/galleries" className="browse" activeClassName="active">
          <Icon name="browse"/>
          <span>Gallery</span>
        </Link>
        <Link to="/player" className="player" activeClassName="active">
          <Icon name="play"/>
          <span>Video</span>
        </Link>
        <Link to="/frame/select" className="design" activeClassName="active">
          <Icon name="design"/>
          <span>Design</span>
        </Link>
        <Link to="/profile" className="profile" activeClassName="active">
          <Icon name="profile"/>
          <span>Profile</span>
        </Link>
      </nav>
    );
  }
}
