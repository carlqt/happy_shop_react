import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Root from './Root';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="routerContainer">
          <Route exact path="/" component={Root} />
        </div>
      </Router>
    )
  }
}

export default App;

