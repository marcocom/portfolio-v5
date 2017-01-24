import React, {Component, PropTypes} from 'react';

export default class FabricBrushPreview extends Component {
  static propTypes = {
    brushSize: PropTypes.number.isRequired,
    brushColor: PropTypes.string.isRequired,
  };
  render() {
    return (
      <figure className="brush-preview">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/800/svg" viewBox="0 0 80 80" width="80" height="80">
            <circle
              cx="40"
              cy="40"
              r={ this.props.brushSize / 2 }
              fill={ this.props.brushColor }
            />
          </svg>
        </div>
      </figure>
    );
  }
}
