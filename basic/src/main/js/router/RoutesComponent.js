import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Page
import Form from "../Form";
import Thanks from "../Thanks";
import Home from "../Home";
import Admin from "../Admin";
import CreateForm from "../CreateForm";
import Results from "../Results";

class RoutesComponent extends Component {
  render() {
    return (
      <div>
        <Route exact path="/survey" component={Form} />
        <Route exact path="/thanks" component={Thanks} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/CreateNewForm" component={CreateForm} />
          <Route exact path="/results" component={Results} />
      </div>
    );
  }
}
export default RoutesComponent;
