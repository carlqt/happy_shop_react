import React from 'react';
import { mount } from 'enzyme';
import Card from '@material-ui/core/Card';

import ItemList from '../itemList';

describe('Products List', () => {
  it('renders products data', () => {
    const data = [
      {
        id: 1,
        name: "Rejoice",
        description: "smooth skin",
        price: {
          amount: "3.50",
          currency: "$",
        },
      },
      {
        id: 2,
        name: "Sunshine",
        description: "Lotion",
        price: {
          amount: "15.55",
          currency: "$",
        },
      },
    ];

    const itemList = mount(<ItemList {...{ data }} />);
    expect(itemList).toMatchSnapshot();
    expect(itemList.find(Card).length).toBe(2)
  })
})
