import { produce } from 'immer';

const initialState = {
  products: [],
  meta: {},
};

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {
    case 'LOAD_PRODUCTS': {
      return produce(state, draft => {
        draft.products = data.data;
        draft.meta = data.meta;
      });
    }
    case 'RESET': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

