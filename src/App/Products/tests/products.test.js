import React from 'react';
import { shallow, mount } from 'enzyme';

import ProductIndex from '../products';

describe('Products Index', () => {
  const props = {
    getProducts: jest.fn(),
    setFilters: jest.fn(),
    products: [],
    meta: {},
    queryParams: {
      sort: '',
      categories: [],
      priceRange: [0, 30000],
      page: 1,
    },
  };

  it('renders correctly', () => {
    const productIndex = shallow(<ProductIndex {...props} />).dive();
    expect(productIndex).toMatchSnapshot();
  }),
  describe('formatFilterParams', () => {
    const productIndex = shallow(<ProductIndex {...props} />).dive();
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
