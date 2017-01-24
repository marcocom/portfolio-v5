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
    const { favorites, funniest, artworks, weird } = this.props.galleryPreviews;
    return (
      <section>
        <Helmet title="Gallery"/>

        { favorites &&
            <div className="galleryListItem">
              <div className="container">
                <h1>Featured Favorites</h1>
                <p>It was hard to choose a favorite few from all of your incredible submissions. That’s why we’ll pick a new set of frames next week. Check back to see if yours made the cut.</p>
                <GalleryPreview name="favorites" count={favorites.length} submissions={favorites}/>
              </div>
            </div>
        }

        { funniest &&
            <div className="galleryListItem">
              <div className="container">
                <h1>Funniest Frames</h1>
                <p>They’ll make you chuckle. They’ll make you laugh out loud. And they might make you spew your morning coffee all over your co-workers. These are our funniest frames.</p>
                <GalleryPreview name="funniest" count={funniest.length} submissions={funniest}/>
              </div>
            </div>
        }

        { artworks &&
            <div className="galleryListItem">
              <div className="container">
                <h1>Works of Art</h1>
                <p>It’s amazing what some of you can create with just your phone and a finger. These frames showcase the impressive creativity. We’re already printing them to hang on our fridge.</p>
                <GalleryPreview name="artworks" count={artworks.length} submissions={artworks}/>
              </div>
            </div>
        }

        { weird &&
            <div className="galleryListItem">
              <div className="container">
                <h1>Lets Get Weird</h1>
                <p>The title says it all. You’re one weird, wild community. And we love that about you.</p>
                <GalleryPreview name="weird" count={weird.length} submissions={weird}/>
              </div>
            </div>
        }
      </section>
    );
  }
}
