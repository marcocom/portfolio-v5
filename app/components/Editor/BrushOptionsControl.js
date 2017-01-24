import React, {Component, PropTypes} from 'react';
import './BrushOptionsControl.less';

export default class BrushOptionsControl extends Component {
  static propTypes = {
    brightness: PropTypes.number.isRequired,
    hue: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
    colorPanelBackgroundColor: PropTypes.string.isRequired,
    saturation: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    updateBrushColor: PropTypes.func.isRequired,
    updateBrushSize: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('resize', ::this.computeSaturationPanelDimentions);
  }

  getSaturationAndBrightness({ pageX, pageY }) {
    if (!this.panelOffsetTop) {
      this.computeSaturationPanelDimentions();
    }
    return {
      saturation: Math.max(0, Math.min(pageX / this.panelWidth * 100, 100)),
      brightness: Math.max(0, Math.min(100 - (pageY - this.panelOffsetTop) / this.panelHeight * 100, 100)),
    };
  }

  computeSaturationPanelDimentions() {
    if (this.saturationPanel) {
      this.panelWidth = this.saturationPanel.clientWidth;
      this.panelHeight = this.saturationPanel.clientHeight;
      this.panelOffsetTop = this.saturationPanel.getBoundingClientRect().top;
    }
  }

  startPanelSelect(mouseDownEvent) {
    const updateValues = this.updatePanelValues.bind(this);
    updateValues(mouseDownEvent);
    window.addEventListener('mousemove', updateValues);
    window.addEventListener('touchmove', updateValues);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', updateValues);
      window.removeEventListener('touchmove', updateValues);
    });
  }

  updatePanelValues(mouseEvent) {
    this.props.updateBrushColor(this.getSaturationAndBrightness(mouseEvent));
  }


  render() {
    const {
      hue,
      saturation,
      brightness,
      opacity,
      size,
      colorPanelBackgroundColor,
      updateBrushColor,
      updateBrushSize,
    } = this.props;
    return (
      <nav className="brush-options">
        <div
          className="saturation"
          ref={ panel => { this.saturationPanel = panel; }}
          style={{ backgroundColor: colorPanelBackgroundColor }}
          onMouseDown={::this.startPanelSelect}
          onTouchStart={::this.startPanelSelect}
        >
          <div className="sat"/>
          <div className="val"/>
          <div className="indicator" style={{ top: `${100 - brightness}%`, left: `${saturation}%` }}/>
        </div>
        <div className="hue">
          <input
            type="range"
            min="0"
            max="360"
            onChange={event => updateBrushColor({hue: event.target.value})}
            value={hue}
          />
        </div>
        <div className="size">
          <label>Brush size</label>
          <input
            type="range"
            min="2"
            max="80"
            value={size}
            onChange={event => updateBrushSize(event.target.value)}
          />
          <div className="value">{size}px</div>
        </div>
        <div className="opacity">
          <label>Opacity</label>
          <input
            type="range"
            min="0"
            max="100"
            onChange={event => updateBrushColor({opacity: event.target.value})}
            value={opacity}
          />
          <div className="value">{opacity}%</div>
        </div>
      </nav>
    );
  }
}
