import React, {PureComponent} from 'react';
import {scaleLinear} from 'd3-scale';
import SVGBrush from 'react-svg-brush';

const WIDTH = 400;
const HEIGHT = 400;
const MARGIN = {TOP: 10, RIGHT: 20, BOTTOM: 40, LEFT: 40};

//duplicate these scales for simplicity, just to demonstrate the point
const xScale = scaleLinear()
  .domain([0, 100])
  .range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT]);

const yScale = scaleLinear()
  .domain([0, 100])
  .range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP]);

const randomScatter = Array(50)
  .fill(0)
  .map(_ => [0, 0].map(_ => Math.round(Math.random() * 100)));

export default class brush3D extends PureComponent {
  constructor(props) {
    super(props);
  }
  _renderAxises() {
    return (
      <React.Fragment>
        <line
          x1={MARGIN.LEFT}
          y1={HEIGHT - MARGIN.BOTTOM}
          x2={WIDTH - MARGIN.RIGHT}
          y2={HEIGHT - MARGIN.BOTTOM}
          stroke="black"
          strokeWidth={1}
        />
        <line />
        <line
          x1={MARGIN.LEFT}
          y1={HEIGHT - MARGIN.BOTTOM}
          x2={MARGIN.LEFT}
          y2={MARGIN.TOP}
          stroke="black"
          strokeWidth={1}
        />
        <line />
        {xScale.ticks(10).map(t => {
          const x = xScale(t);
          return (
            <React.Fragment key={t.toString()}>
              <line
                x1={x}
                y1={HEIGHT - MARGIN.BOTTOM}
                x2={x}
                y2={HEIGHT - MARGIN.BOTTOM + 4}
                stroke="black"
                strokeWidth={1}
              />
              <text
                x={x}
                y={HEIGHT - MARGIN.BOTTOM + 6}
                dominantBaseline="hanging"
                textAnchor="middle"
                fontSize={10}
              >
                {Math.round(t)}
              </text>
            </React.Fragment>
          );
        })}
        {yScale.ticks(10).map(t => {
          const y = yScale(t);
          return (
            <React.Fragment key={t.toString()}>
              <line
                x1={MARGIN.LEFT}
                y1={y}
                x2={MARGIN.LEFT - 4}
                y2={y}
                stroke="black"
                strokeWidth={1}
              />
              <text
                x={MARGIN.LEFT - 6}
                y={y}
                dominantBaseline="middle"
                textAnchor="end"
                fontSize={10}
              >
                {Math.round(t)}
              </text>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
  _renderScatter() {}
  render() {
    return (
      <svg width={WIDTH} height={HEIGHT} ref={input => (this.svg = input)}>
        {this._renderAxises()}
      </svg>
    );
  }
}
