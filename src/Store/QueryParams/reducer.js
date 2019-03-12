import { produce } from 'immer';

const initialState = {
  sort: '',
  categories: [],
  priceRange: [0, 30000],
  page: 1,
};

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {
    case 'SET_PARAMS': {
      return produce(state, draft => ({
        ...draft,
        ...data,
      }));
    }
    case 'RESET': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

