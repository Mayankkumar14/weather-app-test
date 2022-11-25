import React, { Component } from 'react';
import Router from './route/router';
import { BrowserRouter } from 'react-router-dom';
import './App.less';
export default class App extends Component {

  render() {
    return (
      <div className='app'>
        <React.StrictMode>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </React.StrictMode>
      </div>
    );
  }
}

export { App };
