import { connect } from "react-redux";

import { getProducts } from 'Store/Products/actions';
import { setFilters } from 'Store/QueryParams/actions';
import Products from './products';

const mapStateToProps = state => ({
  products: state.productStore.products,
  meta: state.productStore.meta,
  queryParams: state.queryParamsStore,
});

const mapDispatchToProps = {
  getProducts,
  setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

