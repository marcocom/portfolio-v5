import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'components';
import './Header.less';

export default class Header extends Component {
  render() {
    return (
      <nav className="header">
        <Link to="/">
          <Icon name="logo"/>
        </Link>
        <a className="microsite" href="mailto:marco@marcocomparato.com">Email Me</a>
      </nav>
    );
  }
}
