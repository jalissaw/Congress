import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Members from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Members />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
