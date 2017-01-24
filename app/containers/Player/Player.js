import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Icon, Image} from 'components';
import * as OverlayActions from 'redux/reducers/overlay';
import * as PlayerActions from 'redux/reducers/player';
import './Player.less';

@connect(state => ({
  activeFrame: state.player.activeFrame,
  isScrubbing: state.player.isScrubbing,
  playState: state.player.playState,
  totalFrames: state.player.totalFrames,
  playBackSequence: state.player.playBackSequence,
  navSequence: state.player.navSequence,
  loading: state.player.loading,
}),
  dispatch => bindActionCreators(Object.assign({}, OverlayActions, PlayerActions), dispatch)
)
export default class Player extends Component {
  static propTypes = {
    activeFrame: PropTypes.number.isRequired,
    playState: PropTypes.number,
    totalFrames: PropTypes.number,
    playBackSequence: PropTypes.array,
    navSequence: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    isScrubbing: PropTypes.bool.isRequired,
    incrementActiveFrame: PropTypes.func.isRequired,
    decrementActiveFrame: PropTypes.func.isRequired,
    swapPlayState: PropTypes.func.isRequired,
    activateShareOverlay: PropTypes.func.isRequired,
    scrubRelease: PropTypes.func.isRequired,
    getSequenceFrames: PropTypes.func.isRequired,
    getNavFrames: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getSequenceFrames();
    this.interval = setInterval(() => (this.props.playState === 1 && !this.props.loading) && this.props.incrementActiveFrame(), 500);
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  getProfileClasses() {
    const classes = ['Player'];
    if (this.props.playState === 1) {
      classes.push('playback-mode');
    }
    if (this.props.isScrubbing) {
      classes.push('scrub-mode');
    }
    if (this.props.loading) {
      classes.push('loading');
    }
    return classes.join(' ');
  }
  render() {
    const {
      activeFrame,
      playState,
      totalFrames,
      playBackSequence,
      navSequence,
      loading,
    } = this.props;
    // if (playBackSequence && playBackSequence.length && !navSequence.length && !loading) this.props.getNavFrames();
    return playBackSequence && playBackSequence.length ? (
      <section className={this.getProfileClasses()} >
        <Helmet title="Player"/>
        <div className="video">
          <div className="sequence-container">
            <ul>
            {
              playBackSequence.map((obj, ind) => <li key={ind} style={{zIndex: (ind === (activeFrame - 1) ? 100 : ind)}}>
                <Image images={obj.images} sizes="(min-width: 960px) 960px, 100vw" alt={`Image Frame #${ind}`} />
              </li>)
            }
            </ul>
            { playState === 0 &&
            <button className="main-play" onClick={this.props.swapPlayState}>
              <div className="icon-background"></div>
                <span className="play-icon">
                  <Icon name="play"/>
                </span>
            </button>
            }
            <nav>
              <span className="play-icon" onClick={this.props.swapPlayState}>
                { playState === 0 ? <Icon name="play"/> : <Icon name="pause"/> }
              </span>
              <div className="range">
                <input
                  type="range"
                  min="1"
                  max={totalFrames}
                  onChange={event => this.props.scrubRelease(parseInt(event.target.value, 10))}
                  value={activeFrame}
                />
              </div>
              <div className="frame-number"><h4>{`#${activeFrame}`}</h4></div>
            </nav>
          </div>
        </div>
        <div className="original-frame">
          <div className="center-block">
            <div className="previous arrow-btn" onClick={this.props.decrementActiveFrame}>
              <Icon name="arrow-back"/>
              <h5>Last<br/>Frame</h5>
            </div>
            <div className="sequence-container">
              <h1>{`Frame ${activeFrame}`}</h1>
              <ul>
                {
                  (navSequence.length && !loading) &&
                  navSequence.map((obj, ind) => <li key={ind} style={{zIndex: (ind === (activeFrame - 1) ? 100 : ind)}}>
                    <Image images={obj.images} sizes="125px" alt={`Image Frame #${ind}`}/></li>)
                }
              </ul>
            </div>
            <div className="next arrow-btn" onClick={this.props.incrementActiveFrame}>
              <Icon name="arrow-forward"/>
              <h5>Next<br/>Frame</h5>
            </div>
          </div>
        </div>
        <div className="buttons-container container">
          <div className="center-block">
            <Link to={`/frame/${activeFrame}/design`}>
              <button className={`intel ${playState === 1 ? 'outline' : 'blue'}`}>Design this Frame</button>
            </Link>
            <button className={`intel ${playState === 1 ? 'outline' : 'blue'}`} onClick={this.props.activateShareOverlay}>Share this Frame</button>
            <Link to={`/frame/${activeFrame}/download`}>
              <button className={`intel ${playState === 1 ? 'outline' : 'blue'}`}>Upload this Frame</button>
            </Link>
            <button className={`intel ${playState === 1 ? 'outline' : 'blue'}`}>See Submission Details</button>
          </div>
        </div>
      </section>
    ) : (
      <section className={this.getProfileClasses()}>
        <div className="loader"></div>
      </section>
    );
  }
}
