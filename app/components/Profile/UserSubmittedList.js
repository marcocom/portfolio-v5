import React, {Component, PropTypes} from 'react';
import {Icon} from 'components';
import UserSubmittedImage from './UserSubmittedImage';
import UserNewImage from './UserNewImage';

export default class UserSubmittedList extends Component {
  static propTypes = {
    assets: PropTypes.array.isRequired,
    callback: PropTypes.func.isRequired
  };
  render() {
    return this.props.assets ? (
      <ul>
        {
          this.props.assets.map((obj, ind) => <UserSubmittedImage
            key={ind}
            imgAsset={obj.images}
            imgStatus={obj.status}
            imgNum={obj.frameNumber}
          />)
        }
        <UserNewImage callToAction={this.props.callback}/>
      </ul>
    ) : (
      <div className="no-results">
        <Icon name="frame-placeholder"/>
        <h3>You do not have any submitted frames yet</h3>
        <h6>When you download a frame to design on your own, you can return to this tab to upload your
          masterpiece.</h6>
        <button className="intel blue" onClick={this.props.callback}>Create a New Frame</button>
      </div>
    );
  }
}
