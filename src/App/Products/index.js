import { connect } from "react-redux";

import { getProducts } from 'Store/Products/actions';
import Products from './products';

const mapStateToProps = state => ({
  products: state.productStore.products,
  meta: state.productStore.meta,
  queryParams: state.productStore.queryParams,
});

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

