import React, {Component, PropTypes} from 'react';
import {Icon} from 'components';
import './LayoutFormatNav.less';

export default class LayoutFormatNav extends Component {
  static propTypes = {
    layoutFormat: PropTypes.string.isRequired,
    updateLayoutFormat: PropTypes.func.isRequired,
  };
  isActive(format) {
    return format === this.props.layoutFormat ? 'active' : '';
  }
  render() {
    return (
      <nav className="layout-format">
        <div className="container">
          <button className={this.isActive('grid')} onClick={() => this.props.updateLayoutFormat('grid')}>
            <Icon name="grid"/>
          </button>
          <button className={this.isActive('list')} onClick={() => this.props.updateLayoutFormat('list')}>
            <Icon name="list"/>
          </button>
        </div>
      </nav>
    );
  }
}
