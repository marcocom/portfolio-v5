import React, {Component, PropTypes} from 'react';
import {fabric as Fabric} from 'fabric';
import './FabricCanvas.less';

export default class FabricCanvas extends Component {
  static propTypes = {
    brushColor: PropTypes.string.isRequired,
    brushSize: PropTypes.number.isRequired,
    brushType: PropTypes.string.isRequired,
    drawings: PropTypes.object,
    frame: PropTypes.object,
    onNewDrawing: PropTypes.func.isRequired,
    zoom: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.getCanvasImageData = this.getCanvasImageData.bind(this);
  }

  componentDidMount() {
    this.storeDrawings = true;
    this.canvas = new Fabric.Canvas(this.canvasObj, {
      backgroundColor: '#ffffff',
      height: 1080,
      isDrawingMode: true,
      width: 1920,
    });
    this.canvas.on('object:added', ::this.handleNewDrawing);
    if (this.props.frame) { this.addFrameImage(); }
  }

  componentWillReceiveProps({ drawings: newDrawings, background }) {
    if (!this.frameImageAdded && this.props.frame) { this.addFrameImage(); }
    if (background) { this.addBackgroundImage(background); }
    if (!newDrawings.objects || this.numberOfDrawings === newDrawings.objects.length) { return; }
    // this sequence redraws everything
    // from the stored drawings in redux
    newDrawings.objects.forEach(obj => {
      if (obj.items) {
        obj.objects = obj.items;
      }
    });
    this.storeDrawings = false;
    this.canvas.clear();
    this.canvas.loadFromJSON(newDrawings);
    this.canvas.renderAll();
    this.numberOfDrawings = newDrawings.objects.length;
    this.storeDrawings = true;
  }

  getCanvasImageData() {
    function dataURIToBlob(dataURI) {
      const binStr = atob(dataURI.split(',')[1]);
      const len = binStr.length;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      return new Blob([arr], {
        type: 'image/jpeg'
      });
    }
    return new Promise((resolve, reject) => {
      // timeout because toDataURL is blocking state update
      window.setTimeout(() => {
        const canvasData = this.canvas.toDataURL({ format: 'jpeg' });
        if (canvasData) {
          return resolve(dataURIToBlob(canvasData));
        }
        return reject();
      }, 1);
    });
  }

  addFrameImage() {
    this.frameImageAdded = true;
    return Fabric.Image.fromURL(this.props.frame.images.w1920, img => {
      img.set({
        width: 1920,
        height: 1080,
        alignX: 'max',
        alignY: 'max',
      });
      this.canvas.insertAt(img, 0);
    }, { crossOrigin: 'Anonymous' });
  }

  addBackgroundImage(imageURL) {
    this.background = imageURL;
    return Fabric.Image.fromURL(imageURL, (img) => {
      img.set({
        width: 1920,
        height: 1080,
        alignX: 'max',
        alignY: 'max',
      });
      this.canvas.setBackgroundImage(img);
      this.canvas.renderAll();
    });
  }

  handleNewDrawing() {
    if (this.storeDrawings) {
      const drawings = this.canvas.toObject();
      this.numberOfDrawings = drawings.objects.length;
      drawings.objects.forEach(obj => {
        if (obj.objects) {
          obj.items = obj.objects;
        }
      });
      this.props.onNewDrawing({
        drawings,
      });
    }
  }

  updateBrush() {
    if (this.canvas) {
      this.canvas.freeDrawingBrush = new Fabric[`${this.props.brushType}Brush`](this.canvas);
      this.canvas.freeDrawingBrush.color = this.props.brushColor;
      this.canvas.freeDrawingBrush.width = this.props.brushSize;
    }
  }

  render() {
    this.updateBrush();
    const {zoom} = this.props;
    return (
      <div className="frabric-canvas" style={{
        transform: `translate3d(-50%, -50%, 0) scale3d(${zoom}, ${zoom}, ${zoom})` }}>
        <canvas ref={ (canvas) => { this.canvasObj = canvas; } }/>
      </div>
    );
  }
}
