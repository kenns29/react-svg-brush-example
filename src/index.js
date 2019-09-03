import React, {PureComponent} from 'react';
import Brush2D from './brush-2d';
import Brush3D from './brush-3d';
import BrushTransition from './brush-transition';

export default class Main extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div style={{backgroundColor: 'white', paddingLeft: 10}}>
          <div style={{display: 'flex', alignItems: 'center', height: 40}}>
            2D Brush
          </div>
          <div style={{height: 200}}>
            <Brush2D />
          </div>
          <div style={{display: 'flex', alignItems: 'center', height: 40}}>
            3D Brush
          </div>
          <div style={{height: 400}}>
            <Brush3D />
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
