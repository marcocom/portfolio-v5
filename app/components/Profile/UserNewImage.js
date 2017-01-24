import React, {Component, PropTypes} from 'react';
import './UserContentImage.less'; // shared
import {Icon} from '../';

export default class UserNewImage extends Component {

  static propTypes = {
    callToAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    imgAsset: '',
    imgStatus: 'new',
    imgNum: -1
  };

  render() {
    return (
        <li className="user-new-image user-image">
            <div className="image-container" onClick={this.props.callToAction}>
              <Icon name="add-filled"/>
              <div className="img-spacer"></div>
            </div>
            <h4>New frame</h4>
        </li>
    );
  }
}
