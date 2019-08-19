import React, {PureComponent} from 'react';
import {Layout, Divider} from 'antd';
import Brush2D from './brush-2d';

export default class Main extends PureComponent {
  render() {
    return (
      <Layout>
        <Layout.Header>
          <span style={{color: 'white', fontSize: 20}}>Examples</span>
        </Layout.Header>
        <Layout.Content style={{backgroundColor: 'white', paddingLeft: 10}}>
          <div style={{display: 'flex', alignItems: 'center', height: 40}}>
            2D Brush
          </div>
          <div style={{height: 200}}>
            <Brush2D />
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}
