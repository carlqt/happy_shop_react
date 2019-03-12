import React from 'react';
import { shallow, mount } from 'enzyme';

import { getProducts } from 'Requests';
import ProductIndex from '../index';

describe('Products Index', () => {
  it('renders correctly', () => {
    const productIndex = shallow(<ProductIndex />).dive();
    expect(productIndex).toMatchSnapshot();
  }),
  describe('addCategory fn', () => {
    const productIndex = shallow(<ProductIndex />).dive();

    productIndex.instance().addCategory("natural");
    expect(productIndex.state().queryParams.categories).toEqual(["natural"]);
  }),
  describe('removeCategory fn', () => {
    const productIndex = shallow(<ProductIndex />).dive();
    productIndex.setState({
      queryParams: { 
        categories: ["natural", "organic"],
        priceRange: [0, 30000],
      },
    });

    productIndex.instance().removeCategory("natural");
    expect(productIndex.state().queryParams.categories).toEqual(["organic"]);
  }),
  describe('formatFilterParams', () => {
    const productIndex = shallow(<ProductIndex />).dive();
    const params = {
      priceRange: [700, 2000],
      sort: "price"
    };

    const formatParams = productIndex.instance().formatFilterParams(params)
    expect(formatParams).toEqual({
      price: '700..2000',
      sort: 'price',
    });
  })
})
