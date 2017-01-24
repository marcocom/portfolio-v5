import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import './GalleryPreview.less';

export default class GalleryPreview extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    submissions: PropTypes.array.isRequired,
  };

  render() {
    const {count, name, submissions} = this.props;
    return (
      <figure className="gallery-preview">
        <header>
          <Link to={`/frame/${submissions[0].frameNumber}/submission/${submissions[0].submissionId}`}>
            <div style={{ backgroundImage: `url(${submissions[0].images.w960})` }}/>
          </Link>
        </header>
        <main>
          <Link to={`/frame/${submissions[1].frameNumber}/submission/${submissions[1].submissionId}`}>
            <div style={{ backgroundImage: `url(${submissions[1].images.w480})` }}/>
          </Link>
          <Link to={`/frame/${submissions[2].frameNumber}/submission/${submissions[2].submissionId}`}>
            <div style={{ backgroundImage: `url(${submissions[2].images.w480})` }}/>
          </Link>
          <Link to={`/galleries/${name}`}>
            <div style={{ backgroundImage: `url(${submissions[3].images.w480})` }}/>
            <div className="counter">+{count}</div>
          </Link>
        </main>
      </figure>
    );
  }
}
