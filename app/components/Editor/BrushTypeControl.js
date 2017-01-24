import React, {Component, PropTypes} from 'react';
import {Icon} from 'components';

export default class BrushTypeControl extends Component {
  static propTypes = {
    brushType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  getButtonClasses(type) {
    const classes = [type];
    if (type === this.props.brushType) {
      classes.push('active');
    }
    return classes.join(' ');
  }
  render() {
    return (
      <nav className="brush-types">
        <label>Brush types:</label>
        <button className={this.getButtonClasses('Pencil')} onClick={() => this.props.onChange('Pencil')}>
          <Icon name="circle"/>
          <span>Normal</span>
        </button>
        <button className={this.getButtonClasses('Spray')} onClick={() => this.props.onChange('Spray')}>
          <Icon name="spray"/>
          <span>Spray</span>
        </button>
        <button className={this.getButtonClasses('Circle')} onClick={() => this.props.onChange('Circle')}>
          <Icon name="splatter"/>
          <span>Splatter</span>
        </button>
      </nav>
    );
  }
}
