import React from 'react';
import {render} from 'react-dom';
import {document, window} from 'global';

import AppContainer from './src/index';
import 'antd/dist/antd.css';

render(<AppContainer />, document.getElementById('root'));
