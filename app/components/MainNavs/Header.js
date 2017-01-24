import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'components';
import './Header.less';

export default class Header extends Component {
  render() {
    return (
      <nav className="header">
        <Link to="/galleries">
          <Icon name="logo"/>
        </Link>
        <a className="microsite" href="https://intel.com/">#ExperienceMore &gt;</a>
      </nav>
    );
  }
}
