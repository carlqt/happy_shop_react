import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash.isequal';

import { getProducts } from 'Requests'
import List from './itemList';
import FilterSection from './filterSection';
import produce from 'immer';
import { debounce } from 'throttle-debounce';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      meta: {},
      queryParams: {
        sort: '',
        categories: [],
        priceRange: [0, 30000]
      },
    };
  }

  componentDidMount() {
    this.loadProducts()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { queryParams } = this.state;

    if (!isEqual(prevState.queryParams, queryParams)) {
      this.loadProducts(this.formatFilterParams(queryParams))
    }
  }

  loadProducts = debounce(300, (async(params = {}) => {
    const products = await getProducts(params)
    this.setState(
      produce(draft => {
        draft.products = products.data
        draft.meta = products.meta
      })
    );
  }))

  onFilterSelect = (e) => {
    if (e.target.checked) {
      this.addCategory(e.target.value)
    } else {
      this.removeCategory(e.target.value)
    }
  }

  addCategory = (val) => {
    this.setState(
      produce(draft => {
        draft.queryParams.categories.push(val)
      })
    )
  }

  removeCategory = (val) => {
    this.setState(
      produce(draft => {
        draft.queryParams.categories = draft.queryParams.categories.filter(item => item !== val)
      })
    )
  }

  onSliderChange = (value) => {
    this.setState(
      produce(draft => {
        draft.queryParams.priceRange = value;
      })
    )
  }

  formatFilterParams = (params) => {
    const {
      priceRange,
      sort,
      ...otherParams
    } = params;

    const obj = {
      ...otherParams,
      price: `${priceRange[0]}..${priceRange[1]}`,
    };

    if (sort) {
      obj.sort = sort      
    };

    return obj;
  }

  handleSelect = (e) => {
    const { value } = e.target;

    this.setState(
      produce(draft => {
        draft.queryParams.sort = value;
      })
    )
  }

  render() {
    const {
      products,
      meta,
      queryParams,
    } = this.state;
    const { classes } = this.props;

    return (
      <Grid className={classes.container} container spacing={0}>
        <Grid className={classes.drawerContainer} item xs={3}>
          <FilterSection
            {...{ meta, queryParams }}
            onFilterSelect={this.onFilterSelect}
            onSliderChange={this.onSliderChange}
            loadProducts={this.loadProducts}
          />
        </Grid>
        <Grid className={classes.drawer} item xs={9}>
          <Grid className={classes.drawer} item xs={12}>
            <label>
              Sort By: 
              <select value={queryParams.sort} onChange={this.handleSelect}>
                <option value=""> -- no sort -- </option>
                <option value="price">Price (low to high)</option>
                <option value="-price">Price (high to low)</option>
              </select>
            </label>
          </Grid>
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
});

export default withStyles(styles)(ProductList);