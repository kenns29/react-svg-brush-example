import React, {PureComponent} from 'react';
import {scaleTime} from 'd3-scale';
import {timeHour, timeMonth, timeWeek, timeDay} from 'd3-time';
import {timeFormat} from 'd3-time-format';
import SVGBrush from 'react-svg-brush';

const WIDTH = 800;
const HEIGHT = 120;
const MARGIN = {TOP: 10, RIGHT: 0, BOTTOM: 20, LEFT: 1};

export default class Brush2D extends PureComponent {
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
    const scale = scaleTime()
      .domain([new Date(2013, 7, 1), new Date(2013, 7, WIDTH / 60) - 1])
      .rangeRound([MARGIN.LEFT, WIDTH - MARGIN.RIGHT]);
    const timeFormat = getMultiScaleTimeFormat();
    const interval = timeHour.every(12);

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
          console.log(timeFormat(t));
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
    return (
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
      />
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
