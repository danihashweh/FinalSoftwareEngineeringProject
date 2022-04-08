import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Page
import Form from "../Form";
import Thanks from "../Thanks";
import Home from "../Home";

class RoutesComponent extends Component {
  render() {
    return (
      <div>
        <Route exact path="/survey" component={Form} />
        <Route exact path="/thanks" component={Thanks} />
        <Route exact path="/home" component={Home} />
        {/*<Route exact path="/settings" component={SettingsPage} />*/}
      </div>
    );
  }
}
export default RoutesComponent;
