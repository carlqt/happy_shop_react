import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Root from './Root';
import ProductList from './Products';
import ProductInfo from './ProductInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="routerContainer">
          <Route exact path="/" component={Root} />
          <Switch>
            <Route exact path="/products" component={ProductList} />
            <Route path="/products/:id" component={ProductInfo} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

