import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { getProducts } from 'Requests'
import List from './itemList';
import FilterSection from './filterSection';


class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.loadProducts()
  }

  loadProducts = async (params = {}) => {
    const products = await getProducts(params)
    this.setState({ products: products.data });
  }

  render() {
    const { products } = this.state;
    const { classes } = this.props;

    return (
      <Grid className={classes.container} container spacing={0}>
        <Grid className={classes.drawerContainer} item xs={3}>
          <FilterSection loadProducts={this.loadProducts} />
        </Grid>
        <Grid className={classes.drawer} item xs={9}>
          <List data={products} />
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  container: {
    height: '100vh',
  },
  drawer: {
    padding: 24,
  },
  item: {
  }
});

export default withStyles(styles)(ProductList);