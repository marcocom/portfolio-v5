import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import * as IntroActions from 'redux/reducers/intro';
import {connect} from 'react-redux';
import {Link} from 'react-router';
// import {Image} from 'components';
import './Intro.less';

@connect(state => ({
  activeFrame: state.intro.activeFrame,
  numberOfFrames: state.intro.numberOfFrames,
}),
  
  dispatch => bindActionCreators(IntroActions, dispatch)
)
export default class Intro extends Component {
  static propTypes = {
    activeFrame: PropTypes.number.isRequired,
    incrementActiveFrame: PropTypes.func.isRequired,
    numberOfFrames: PropTypes.number.isRequired,
  };
  componentDidMount() {
    this.interval = setInterval(this.props.incrementActiveFrame, 175);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  createIntroImages() {
    const images = [];
    for (let index = 1; index <= this.props.numberOfFrames; index++) {
      const zIndex = this.props.activeFrame === index ? 200 : 1;
      images.push(<div key={index} className={`frame frame-${index}`} style={{ zIndex }}/>);
      // const child = (<div key={index} style={{zIndex}}>
      //   <Image images={imgAsset} sizes="145px" alt={`Submitted Frame #${imgNum}`}/>
      // </div>);
      // images.push(child);
    }
    return images;
  }
  render() {
    return (
      <section className="intro">
        <Helmet title="Intro"/>
        <div className="images">
          { this.createIntroImages() }
        </div>
        <div className="text">
          <div className="container">
            <h2>#ExperienceMore with Tom Brady and Intel 360 Replay</h2>
            <p>
              Intel 360 Replay technology lets you experience more of your
              favorite sports action. Use our tech and your creativity to
              create a social, crowdsourced video featuring the game’s greatest.
              Are you ready to #ExperienceMore?
            </p>
            <nav>
              <Link to="/player">
                <button className="intel outline">Watch Full Video</button>
              </Link>
              <Link to="/frame/select">
                <button className="intel">Design A Frame</button>
              </Link>
            </nav>
            <p>Already have an account? <Link to="/profile">Sign in</Link></p>
          </div>
        </div>
      </section>
    );
  }
}
