import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SubmissionList} from 'components';
import * as FrameActions from 'redux/reducers/frames';
import './Gallery.less';

@connect(
  state => ({
    submissions: state.frames.categorySubmissions,
    loading: state.frames.categorySubmissionsLoading,
  }),
  dispatch => bindActionCreators(FrameActions, dispatch)
)
export default class Gallery extends Component {
  static propTypes = {
    getCategorySubmissions: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    submissions: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getCategorySubmissions(this.props.params.galleryId);
  }

  render() {
    return (
      <section className="gallery-page">
        <Helmet title="Gallery" />
        <div className="container">
          { this.props.params.galleryId === 'favorites' &&
              <div>
                <h1>Featured Favorites</h1>
                <p>It was hard to choose a favorite few from all of your incredible submissions. That’s why we’ll pick a new set of frames next week. Check back to see if yours made the cut.</p>
              </div>
          }
          { this.props.params.galleryId === 'funniest' &&
              <div>
                <h1>Funniest Frames</h1>
                <p>They’ll make you chuckle. They’ll make you laugh out loud. And they might make you spew your morning coffee all over your co-workers. These are our funniest frames.</p>
              </div>
          }
          { this.props.params.galleryId === 'artworks' &&
              <div>
                <h1>Works of Art</h1>
                <p>It’s amazing what some of you can create with just your phone and a finger. These frames showcase the impressive creativity. We’re already printing them to hang on our fridge.</p>
              </div>
          }
          { this.props.params.galleryId === 'weird' &&
              <div>
                <h1>Lets Get Weird</h1>
                <p>The title says it all. You’re one weird, wild community. And we love that about you.</p>
              </div>
          }
        </div>
        { this.props.loading &&
            <div>LOADING</div>
        }
        { this.props.submissions.length > 0 &&
            <SubmissionList submissions={this.props.submissions} />
        }
      </section>
    );
  }
}
