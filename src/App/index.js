import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Root from './Root';
import ProductList from './Products';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="routerContainer">
          <Route exact path="/" component={Root} />
          <Route exact path="/products" component={ProductList} />
        </div>
      </Router>
    )
  }
}

export default App;

