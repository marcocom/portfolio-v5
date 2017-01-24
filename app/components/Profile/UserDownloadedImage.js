import React, {Component, PropTypes} from 'react';
import {Icon, Image} from 'components';
import './UserContentImage.less';

export default class UserDownloadedImage extends Component {
  static propTypes = {
    imgAsset: PropTypes.object.isRequired,
    imgNum: PropTypes.number.isRequired,
    callToAction: PropTypes.func.isRequired,
  };
  render() {
    const {callToAction, imgNum, imgAsset} = this.props;
    return (
      <li className="user-downloaded-image user-image">
        <div className="image-container" onClick={callToAction}>
          <Icon name="add-filled"/>
          <Image images={imgAsset} sizes="145px" alt={`Tom Brady Frame #${imgNum}`}/>
        </div>
        <h4>Upload frame {imgNum}</h4>
      </li>
    );
  }
}
