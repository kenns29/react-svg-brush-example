import React, {PureComponent} from 'react';
import {scaleTime} from 'd3-scale';
import {timeHour, timeMonth, timeWeek, timeDay} from 'd3-time';
import {timeFormat} from 'd3-time-format';
import {Spring} from 'react-spring/renderprops';
import SVGBrush from 'react-svg-brush';

const WIDTH = 800;
const HEIGHT = 120;
const MARGIN = {TOP: 10, RIGHT: 0, BOTTOM: 20, LEFT: 1};

const scale = scaleTime()
  .domain([new Date(2013, 7, 1), new Date(2013, 7, WIDTH / 60) - 1])
  .rangeRound([MARGIN.LEFT, WIDTH - MARGIN.RIGHT]);

const interval = timeHour.every(12);

export default class BrushTransition extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      brushSelection: null,
      intermediateBrushSelection: null
    };
  }
  _renderBackground() {
    return (
      <React.Fragment>
        <rect
          x={MARGIN.LEFT}
          y={MARGIN.TOP}
          width={WIDTH - MARGIN.LEFT - MARGIN.RIGHT}
          height={HEIGHT - MARGIN.BOTTOM - MARGIN.TOP}
          fill="lightgrey"
        />
      </React.Fragment>
    );
  }
  _renderAxis() {
    const timeFormat = getMultiScaleTimeFormat();

    return (
      <React.Fragment>
        {scale.ticks(interval).map(t => {
          const x = scale(t);
          return (
            <line
              key={'line-' + t.toString()}
              x1={x}
              y1={HEIGHT - MARGIN.BOTTOM}
              x2={x}
              y2={MARGIN.TOP}
              stroke="#fff"
              strokeWidth={1}
              strokeOpacity={timeDay(t) ? 1 : 0.5}
            />
          );
        })}
        {scale.ticks(timeDay).map(t => {
          const x = scale(t);
          return (
            <React.Fragment key={t.toString()}>
              <line
                key={'tick-' + t.toString()}
                x1={x}
                y1={HEIGHT - MARGIN.BOTTOM}
                x2={x}
                y2={HEIGHT - MARGIN.BOTTOM + 6}
                stroke="black"
                strokeWidth={1}
              />
              <text
                key={'label' + t.toString()}
                x={x + 3}
                y={HEIGHT - MARGIN.BOTTOM + 4}
                dominantBaseline="hanging"
                fontSize={10}
              >
                {timeFormat(t)}
              </text>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
  _renderBrush() {
    const {brushSelection, intermediateBrushSelection} = this.state;
    const fs = intermediateBrushSelection || brushSelection;
    const ts = brushSelection;
    const [[fx0, fy0], [fx1, fy1]] = fs || [[0, 0], [0, 0]];
    const [[tx0, ty0], [tx1, ty1]] = ts || [[0, 0], [0, 0]];
    return (
      <Spring
        from={{x0: fx0, y0: fy0, x1: fx1, y1: fy1}}
        to={{x0: tx0, y0: ty0, x1: tx1, y1: ty1}}
        immediate={!intermediateBrushSelection}
      >
        {props => (
          <SVGBrush
            extent={[
              [MARGIN.LEFT, MARGIN.TOP],
              [MARGIN.LEFT + WIDTH - MARGIN.RIGHT, HEIGHT - MARGIN.BOTTOM]
            ]}
            getEventMouse={event => {
              const {clientX, clientY} = event;
              const {left, top} = this.svg.getBoundingClientRect();
              return [clientX - left, clientY - top];
            }}
            brushType="x"
            selection={
              brushSelection && [[props.x0, props.y0], [props.x1, props.y1]]
            }
            onBrush={({selection}) => {
              this.setState({
                brushSelection: selection,
                intermediateBrushSelection: null
              });
            }}
            onBrushEnd={({selection}) => {
              if (!selection) {
                this.setState({
                  brushSelection: null,
                  intermediateBrushSelection: null
                });
                return;
              }
              const [[x0, y0], [x1, y1]] = selection;
              const [v0, v1] = [x0, x1].map(d =>
                interval.round(scale.invert(d))
              );
              const [rx0, rx1] = [v0, v1].map(scale);
              this.setState({
                brushSelection: [[rx0, y0], [rx1, y1]],
                intermediateBrushSelection: [[x0, y0], [x1, y1]]
              });
            }}
          />
        )}
      </Spring>
    );
  }
  render() {
    return (
      <svg width={WIDTH} height={HEIGHT} ref={input => (this.svg = input)}>
        {this._renderBackground()}
        {this._renderAxis()}
        {this._renderBrush()}
      </svg>
    );
  }
}

function getMultiScaleTimeFormat() {
  const formatHour = timeFormat('%I %p'),
    formatDay = timeFormat('%a %d'),
    formatWeek = timeFormat('%b %d'),
    formatMonth = timeFormat('%B');

  return date =>
    (timeDay(date) < date
      ? formatHour
      : timeMonth(date) < date
      ? timeWeek(date) < date
        ? formatDay
        : formatWeek
      : formatMonth)(date);
}
