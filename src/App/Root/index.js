import React, { Component } from 'react';
import { Redirect } from 'react-router'

class Root extends Component {
  render() {
    return (
      <Redirect to="/products" />
    );
  }
}

export default Root;
