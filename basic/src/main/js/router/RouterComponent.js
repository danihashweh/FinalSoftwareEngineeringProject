import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import RoutesComponent from './RoutesComponent';

class RouterComponent extends Component {
  render() {
    return (
      <Router basename="/">
        <div>
          <RoutesComponent />
        </div>
      </Router>
    );
  }
}
export default RouterComponent;
