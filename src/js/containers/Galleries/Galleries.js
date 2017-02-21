import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GalleryPreview} from 'components';
import * as FrameActions from 'redux/reducers/frames';
import './Galleries.less';

@connect(
  state => ({
    galleryPreviews: state.frames.galleryPreviews,
  }),
  dispatch => bindActionCreators(FrameActions, dispatch)
)
export default class Galleries extends Component {
  static propTypes = {
    galleryPreviews: PropTypes.object.isRequired,
    getGalleryPreviewImages: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGalleryPreviewImages();
  }

  render() {
    const { favorites } = this.props.galleryPreviews;
    return (
      <section>
        <Helmet title="Gallery" />

        { favorites &&
            <div className="galleryListItem">
              <div className="container">
                <h1>Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet.</p>
                <GalleryPreview name="favorites" count={favorites.length} submissions={favorites} />
              </div>
            </div>
        }

      </section>
    );
  }
}
