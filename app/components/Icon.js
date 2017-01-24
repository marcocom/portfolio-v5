import React, { Component, PropTypes } from 'react';

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    const svgString = require(`../theme/icons/${this.props.name}.svg`);
    return <figure className={`icon ${this.props.name}`} dangerouslySetInnerHTML={{__html: svgString}}/>;
  }
}
