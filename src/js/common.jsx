/**
 * Created by jry on 17-3-31.
 */
import React, {
  Component
} from 'react';
import ReactDOM from "react-dom";

import {
  Link, Redirect, NavLink
} from 'react-router-dom';



import PropTypes from "prop-types";

import { Row, Container, Col,Button } from "reactstrap";

export const Icon = (props) => {
  let { i = "", size = 2, className = "" } = props;

  if (i == "") {
    return null;
  }

  i = "fa fa-" + i;
  const sizeS = "fa-" + size + "x";

  var newprop = {};
  Object.assign(newprop, props);
  delete newprop.i;
  delete newprop.size;
  delete newprop.className;

  return (
    <i {...newprop} className={i + " " + sizeS + " " + className}></i>
  );
};


Number.prototype.format = function (bit = 1, blank = 0) {
  let str = `${this}`;
  if (str.length < bit) {
    const forNum = (bit - str.length);
    for (let i = 0; i < forNum; i++) {
      str = `${blank}${str}`;
    }
  }
  return str;
};

export class InputGroupM extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FormGroup controlId={this.props.id}>
        <Col componentClass={ControlLabel} sm={this.props.tl || 5} htmlFor={this.props.id}>
          <Tr>{this.props.title}</Tr>
        </Col>
        <Col sm={12 - (this.props.tl || 5)}>{this.props.children}</Col>
      </FormGroup>
    );
  }
}

class Banner extends Component {
  render(){
    return <div>

      <div className="btn-group-vertical" >
      <NavLink exact className="btn btn-outline-primary" activeClassName="active" to="/">编辑</NavLink>
        <NavLink exact className="btn btn-outline-primary" activeClassName="active" to="/setting">设置</NavLink>
</div>

      </div>
  }
}

export class MainBody extends Component {
  render() {
    return <Container fluid style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col md={{ size: 6, offset: 3 }} style={{ height: "100%" }}>
        
            {!!this.props.children &&this.props.children[0]}

        </Col>
        <Col md={3}>
        <Banner/>
        <div style={{height:"1em"}}></div>
        {!!this.props.children && this.props.children[1]}
        </Col>
      </Row>
    </Container >;
  }
}