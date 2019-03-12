import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from 'redux-thunk';

import productsReducer from 'Store/Products/reducer';
import queryParamsReducer from 'Store/QueryParams/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const combinedReducers = combineReducers({
  productStore: productsReducer,
  queryParamsStore: queryParamsReducer,
});

export default createStore(combinedReducers, composeEnhancers(applyMiddleware(thunk)));

