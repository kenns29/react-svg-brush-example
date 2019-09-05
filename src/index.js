import React, {PureComponent} from 'react';
import Brush1D from './brush-1d';
import Brush2D from './brush-2d';
import BrushTransition from './brush-transition';

export default class Main extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div style={{backgroundColor: 'white', paddingLeft: 10}}>
          <div style={{display: 'flex', alignItems: 'center', height: 40}}>
            1D Brush
          </div>
          <div style={{height: 200}}>
            <Brush1D />
          </div>
          <div style={{display: 'flex', alignItems: 'center', height: 40}}>
            2D Brush
          </div>
          <div style={{height: 400}}>
            <Brush2D />
          </div>
          <div style={{display: 'flex', alignItems: 'center', height: 40}}>
            Brush Snapping (Transition)
          </div>
          <div style={{height: 200}}>
            <BrushTransition />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
