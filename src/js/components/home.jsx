import React, {
  Component
} from 'react';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { Col, Input } from "reactstrap";


import { MainBody } from "../common";

import { fs } from "../fs";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onInput = this.onInput.bind(this);
  }
  //fs.readFileSync(path[, options])
  //fs.writeFile(file, data[, options], callback)
  //

  onInput(e) {
    let title = this.refs["title"].value;
    let desc = this.refs["desc"].value;
    let text = this.refs["text"].value;

    console.log(this.refs["desc"], desc);

    let result = title + "\r\n-------" + desc + "\r\n-------" + text;

    //fs.writeFile("./tmp.txt", result, function () { console.log(arguments) });
  }
  render() {
    return (
      <MainBody>
        <Input style={{ marginBottom: "5px", flexGrow: 0 }} onInput={this.onInput} ref="title" />
        <Input type="textarea" style={{ marginBottom: "5px", flexGrow: 6 }} onInput={this.onInput} ref="text" />
        <Input type="textarea" style={{ flexGrow: 2 }} onInput={this.onInput} ref="desc" />
        <Link to="/id/123">123</Link>
      </MainBody>
    );
  }
}