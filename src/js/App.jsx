import React, {
  Component
} from 'react';

//import Rb from 'react-bootstrap';
//import logo from '../media/logo.svg';
//import '../css/App.css';
//import '../css/bootstrap.default.css';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {
  Home
} from './components/home';

import { SettingPanel } from './components/setting';

import { Test } from "./components/test";

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="height100">
          <div>
          </div>
          <Route exact path="/" component={Home} />
          <Route exact path="/setting" component={SettingPanel} />
          <Route exact path="/id/:id" component={Test} />
        </div>
      </Router>
    );
  }
}

