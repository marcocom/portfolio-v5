import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from 'redux/reducers/auth';
import * as EditorActions from 'redux/reducers/editor';
import * as FrameActions from 'redux/reducers/frames';
import {ActionCreators as UndoActions} from 'redux-undo';
import {
  BrushTypeControl,
  BrushOptionsControl,
  FabricCanvas,
  FabricBrushPreview,
  PromptConfirm,
  Icon,
} from 'components';
import './FrameDesign.less';

@connect(
  state => ({
    background: state.editor.brush.background,
    backgroundPromptOpen: state.editor.brush.backgroundPromptOpen,
    brushBrightness: state.editor.brush.brightness,
    brushColor: state.editor.brush.color,
    brushHue: state.editor.brush.hue,
    brushOpacity: state.editor.brush.opacity,
    brushSaturation: state.editor.brush.saturation,
    brushSize: state.editor.brush.size,
    brushType: state.editor.brush.type,
    canUndo: state.editor.drawings.past.length > 0,
    colorPanelBackgroundColor: state.editor.brush.colorPanelBackgroundColor,
    controlsOpen: state.editor.brush.controlsOpen,
    drawings: state.editor.drawings.present.drawings,
    deletePromptVisible: state.editor.brush.deletePromptVisible,
    frame: state.frames.activeFrame,
    submitting: state.auth.loading,
    uploadProgress: state.auth.uploadProgress,
    uploadingJpg: state.auth.uploadingJpg,
    zoom: state.editor.brush.zoom,
  }),
  dispatch => bindActionCreators(Object.assign({},
    AuthActions,
    EditorActions,
    FrameActions,
    UndoActions,
  ), dispatch)
)
export default class FrameDesign extends Component {
  static propTypes = {
    background: PropTypes.string,
    backgroundPromptOpen: PropTypes.bool.isRequired,
    brushBrightness: PropTypes.number.isRequired,
    brushColor: PropTypes.string.isRequired,
    brushHue: PropTypes.number.isRequired,
    brushOpacity: PropTypes.number.isRequired,
    brushSaturation: PropTypes.number.isRequired,
    brushSize: PropTypes.number.isRequired,
    brushType: PropTypes.string.isRequired,
    canUndo: PropTypes.bool.isRequired,
    clearCanvas: PropTypes.func.isRequired,
    colorPanelBackgroundColor: PropTypes.string.isRequired,
    controlsOpen: PropTypes.bool.isRequired,
    deletePromptVisible: PropTypes.bool.isRequired,
    drawings: PropTypes.object,
    frame: PropTypes.object,
    getActiveFrame: PropTypes.func.isRequired,
    incrementZoom: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    newDrawing: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    selectBackground: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    toggleBackgroundPrompt: PropTypes.func.isRequired,
    toggleControls: PropTypes.func.isRequired,
    toggleDeletePrompt: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    updateBrushColor: PropTypes.func.isRequired,
    updateBrushSize: PropTypes.func.isRequired,
    updateBrushType: PropTypes.func.isRequired,
    uploadProgress: PropTypes.number.isRequired,
    uploadingJpg: PropTypes.bool.isRequired,
    zoom: PropTypes.number.isRequired,
  };

  componentDidMount() {
    if (!this.props.frame) {
      this.props.getActiveFrame(this.props.params.frameNumber);
    }
  }

  getEditorClasses() {
    const classes = ['editor'];
    if (this.props.controlsOpen) { classes.push('controls-expanded'); }
    if (this.props.submitting) { classes.push('submission-modal-active'); }
    if (this.props.backgroundPromptOpen) { classes.push('background-prompt-open'); }
    return classes.join(' ');
  }

  closeControls() {
    if (this.props.controlsOpen) {
      this.props.toggleControls();
    }
    if (this.props.backgroundPromptOpen) {
      this.props.toggleBackgroundPrompt();
    }
  }

  submitFrame() {
    const { login, submit, frame } = this.props;
    login({
      after: user => {
        const metadata = {
          userId: user.id,
          frameNumber: `${frame.frameNumber}`,
          author: `${user.first_name} ${user.last_name}`,
        };
        if (user.location && user.location.name) {
          metadata.location = user.location.name;
        }
        submit({
          jpgDataPromise: this.canvas.getCanvasImageData,
          imageName: `${user.id}-${Date.now()}.jpg`,
          redirect: '/profile',
          metadata,
        });
      }
    });
  }

  render() {
    const {
      background, brushBrightness, brushColor, brushHue, brushOpacity, brushSaturation, brushSize, brushType, canUndo, clearCanvas, colorPanelBackgroundColor, drawings, deletePromptVisible, frame, incrementZoom, newDrawing, selectBackground, toggleBackgroundPrompt, toggleControls, toggleDeletePrompt, undo, updateBrushColor, updateBrushSize, updateBrushType, zoom,
    } = this.props;
    return (
      <section className={this.getEditorClasses()}>
        <Helmet title="Frame"/>

        <div className="editor-container">
          <FabricCanvas
            ref={ (canvas) => { this.canvas = canvas; } }
            background={background}
            brushColor={brushColor}
            brushSize={brushSize}
            brushType={brushType}
            drawings={drawings}
            frame={frame}
            onNewDrawing={newDrawing}
            zoom={zoom}
          />
          <nav className="zoom-controls">
            <button onClick={() => incrementZoom(0.1)}>
              <Icon name="add"/>
            </button>
            <button onClick={() => incrementZoom(-0.1)}>
              <Icon name="minus"/>
            </button>
          </nav>

          <div className="shader" onClick={::this.closeControls}>
            <button className="escape">
              <Icon name="X"/>
            </button>
          </div>

          <div className="background-prompt">
            <h2>Upload a background</h2>
            <Dropzone className="drop-zone" activeClassName="active" onDrop={selectBackground} accept="image/*">
              <p>Click or drag an image onto this square to put a background behind Brady.</p>
            </Dropzone>
          </div>

          <div className="expandable-controls">
            <FabricBrushPreview
              brushSize={brushSize}
              brushColor={brushColor}
            />
            <nav className="control-bar">
              <button className={canUndo ? '' : 'disabled'} onClick={undo}>
                <Icon name="undo"/>
              </button>
              <button onClick={toggleDeletePrompt}>
                <Icon name="trash"/>
              </button>
              <button className="tools" onClick={toggleControls}>
                <Icon name="pencil"/>
              </button>
              <button className="add-background" onClick={toggleBackgroundPrompt}>
                <Icon name="background"/>
              </button>
              <button className="submit-design" onClick={::this.submitFrame}>
                <span>Submit</span>
              </button>
            </nav>
            <BrushOptionsControl
              brightness={brushBrightness}
              hue={brushHue}
              opacity={brushOpacity}
              colorPanelBackgroundColor={colorPanelBackgroundColor}
              saturation={brushSaturation}
              size={brushSize}
              updateBrushColor={updateBrushColor}
              updateBrushSize={updateBrushSize}
            />
            <BrushTypeControl
              brushType={brushType}
              onChange={updateBrushType}
            />
          </div>
        </div>

        <div className={`prompt-overlay ${deletePromptVisible && 'active'}`} onClick={toggleDeletePrompt}></div>
        <PromptConfirm options={{
          title: 'Are you sure?',
          body: 'Deleting your frame design will erase all that hard work.',
          confirm: 'Delete My Design',
          action: clearCanvas,
          cancel: toggleDeletePrompt,
          show: deletePromptVisible,
        }}/>

      <div className="submission-modal">
        { !this.props.uploadingJpg &&
            <h1>Preparing your submission</h1>
        }
        { this.props.uploadingJpg &&
            <div>
              <h1>Uploading your submission</h1>
              <div className="progress-indicator">
                <div className="progress" style={{ width: `${this.props.uploadProgress}%` }}></div>
              </div>
            </div>
        }
      </div>
    </section>
    );
  }
}
