import React, {Component, PropTypes} from 'react';
import Image from '../Image';
import './UserContentImage.less';

export default class UserSubmittedImage extends Component {

  static propTypes = {
    imgAsset: PropTypes.object.isRequired,
    imgStatus: PropTypes.string.isRequired,
    imgNum: PropTypes.number.isRequired,
  };

  render() {
    const statusNames = { // INTEL_APPROVAL', 'BRADY_APPROVAL', 'APPROVED', 'REJECTED'
      APPROVED: 'Approved',
      BRADY_APPROVAL: 'Pending approval',
      INTEL_APPROVAL: 'Pending approval',
      REJECTED: 'Rejected'
    };
    const classNames = {
      APPROVED: 'completed',
      BRADY_APPROVAL: 'inprogress',
      INTEL_APPROVAL: 'inprogress',
      REJECTED: 'rejected'
    };
    const { imgStatus, imgNum, imgAsset } = this.props;
    return (
      <li className="user-submitted-image user-image">
        <div className="image-container">
          <div className={`status-circle ${classNames[imgStatus]}`}></div>
          <Image images={imgAsset} sizes="145px" alt={`Submitted Frame #${imgNum}`}/>
        </div>
        <h4>Frame {imgNum}</h4>
        <h6 className={imgStatus.toLowerCase()}>
          { statusNames[imgStatus] }
        </h6>
      </li>
    );
  }
}
