import React, {
  Component
} from 'react';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { Col } from "reactstrap";

import { MainBody } from "../common";

export class Home extends Component {
  render() {
    return (
      <MainBody>
        <Link to="/id/123">123</Link>
      </MainBody>
    );
  }
}