import React, {Component, PropTypes} from 'react';
import UserDownloadedImage from './UserDownloadedImage';

export default class UserDownloadedList extends Component {
  static propTypes = {
    assets: PropTypes.array.isRequired,
    callback: PropTypes.func.isRequired
  };
  render() {
    const {assets, callback} = this.props;
    return (assets.length) ? (
      <div>
        <p>These are all the frames you’ve downloaded. Done making your masterpiece? Click on the frame you finished
          below to upload your work of art.
        </p>
        <ul>
          {
            assets.map((obj, ind) => <UserDownloadedImage
              key={ind}
              imgAsset={obj.images}
              imgStatus={obj.status}
              imgNum={obj.frameNumber}
              callToAction={callback}
            />)
          }
        </ul>
      </div>
    ) : (
      <div className="no-results"></div>
    );
  }
}
