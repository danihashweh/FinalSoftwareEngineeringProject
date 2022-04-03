import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Page
import Form from "../Form";
import Thanks from "../Thanks";

class RoutesComponent extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Form} />
        <Route exact path="/thanks" component={Thanks} />
        {/*<Route exact path="/register" component={RegisterPage} />*/}
        {/*<Route exact path="/settings" component={SettingsPage} />*/}
      </div>
    );
  }
}
export default RoutesComponent;
