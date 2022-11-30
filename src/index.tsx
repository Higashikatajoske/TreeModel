import React from 'react';
import ReactDOM from 'react-dom/client';
import TreeModel from './TreeModel';
import './treeModel.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TreeModel/>
  </React.StrictMode>
);

