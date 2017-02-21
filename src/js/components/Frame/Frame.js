import React, {Component, PropTypes} from 'react';
import {Image} from 'components';
import './Frame.less';

export default class Frame extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    indicator: PropTypes.bool,
    onClick: PropTypes.func,
  };
  render() {
    const {frameNumber, images} = this.props.data;
    return (
      <figure className="frame-image" onClick={this.props.onClick}>
        <div className="image-container">
          <Image images={images} sizes="325px" alt={`Tom Brady Frame #${frameNumber}`} />
        </div>
        {this.props.indicator && <div className="indicator">{frameNumber}</div>}
      </figure>
    );
  }
}
