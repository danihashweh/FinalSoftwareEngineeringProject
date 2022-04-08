import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Page
import Form from "../Form";
import Thanks from "../Thanks";
import Home from "../Home";
import Admin from "../Admin";

class RoutesComponent extends Component {
  render() {
    return (
      <div>
        <Route exact path="/survey" component={Form} />
        <Route exact path="/thanks" component={Thanks} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/admin" component={Admin} />
      </div>
    );
  }
}
export default RoutesComponent;
