import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'components';
import './MaInNav.less';

export default class MainNav extends Component {
  
  render() {
    return (
      <nav className="TabBar">
        <Link to="/galleries" className="browse" activeClassName="active">
          <Icon name="gear" />
          <span>Showcase</span>
        </Link>
        <Link to="/about" className="player" activeClassName="active">
          <Icon name="gear" />
          <span>About</span>
        </Link>
        <Link to="/contact" className="design" activeClassName="active">
          <Icon name="gear" />
          <span>Contact</span>
        </Link>
      </nav>
    );
  }
}
