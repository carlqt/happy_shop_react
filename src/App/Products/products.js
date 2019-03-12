import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash.isequal';
import Typography from '@material-ui/core/Typography';

import List from './itemList';
import FilterSection from './filterSection';
import produce from 'immer';
import { debounce } from 'throttle-debounce';
import Pagination from './pagination';
import 'typeface-roboto';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      meta: {},
      queryParams: {
        sort: '',
        categories: [],
        priceRange: [0, 30000],
        page: 1,
      },
    };
  }

  componentDidMount() {
    const { getProducts, queryParams } = this.props;
    getProducts(this.formatFilterParams(queryParams));
  }

  componentDidUpdate = (prevProps) => {
    const { queryParams } = this.props;

    if (!isEqual(prevProps.queryParams, queryParams)) {
      this.loadProducts(this.formatFilterParams(queryParams))
    }
  }

  loadProducts = debounce(300, (async(params = {}) => {
    const { getProducts } = this.props;
    getProducts(params);
  }))

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
    const { queryParams, setFilters } = this.props;
    const { value } = e.target;

    setFilters({
      ...queryParams,
      sort: value,
    })
  }

  pageUpdate = (page) => {
    this.setState(
      produce(draft => {
        draft.queryParams.page = page
      })
    )
  }

  renderPageDisplay = () => {
    const { meta } = this.props;

    if (Object.keys(meta).length === 0) {
      return '';
    }

    const {
      total_items: totalItems,
      to,
      from,
    } = meta;

    return `SHOWING ${from}-${to} of ${totalItems} RESULTS`
  }

  redirect = (id) => {
    const { history } = this.props;
    history.push(`/products/${id}`)
  }

  render() {
    const {
      classes,
      products,
      meta,
      queryParams,
      setFilters,
    } = this.props;

    return (
      <Grid className={classes.container} container spacing={0}>
        <Grid className={classes.drawerContainer} item xs={3}>
          <FilterSection
            {...{
              meta,
              queryParams,
              setFilters,
            }}
            loadProducts={this.loadProducts}
          />
        </Grid>
        <Grid className={classes.drawer} item xs={9}>
          <Grid item xs={12}>
            <label>
              Sort By: 
              <select value={queryParams.sort} onChange={this.handleSelect}>
                <option value=""> -- no sort -- </option>
                <option value="price">Price (low to high)</option>
                <option value="-price">Price (high to low)</option>
              </select>
            </label>
            <Pagination
              {...{
                meta,
                queryParams,
                setFilters,
              }}
              pageUpdate={this.pageUpdate}
            />
            <Typography style={{display: 'inline-block'}} variant="h6">
              { this.renderPageDisplay() }
            </Typography>
          </Grid>
          <List onItemClick={this.redirect} data={products} />
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
