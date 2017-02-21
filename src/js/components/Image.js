import React, { Component, PropTypes } from 'react';

export default class Icon extends Component {
  static propTypes = {
    images: PropTypes.object.isRequired,
    sizes: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };
  getSrcSetString(images) {
    // assumes images keys are `w${size}`
    return Object.keys(images)
      .map(size => `${images[size]} ${size.slice(1)}w`)
      .join(', ');
  }
  render() {
    const {images, sizes, alt} = this.props;
    return (
      <img
        srcSet={this.getSrcSetString(images)}
        sizes={sizes}
        alt={alt}
      />
    );
  }
}
