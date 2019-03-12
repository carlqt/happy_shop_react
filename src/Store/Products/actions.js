import apiRoutes from 'Requests/apiRoutes';

export function getProducts(filters = {}) {
  const filterParams = {
    ...filters,
  }
  const url = `${apiRoutes.getProducts}?${encodedParams(filterParams)}`

  return async (dispatch) => {
    const response = await fetch(url)
    const jsonResponse = await response.json();

    dispatch({
      type: 'LOAD_PRODUCTS',
      data: jsonResponse,
    });
  }
}

function flatten(a, b) {
  return a.concat(b);
}

export async function getProduct(id) {
  const url = `${apiRoutes.getProducts}/${id}`;

  const response = await fetch(url);
  return response.json();
}

function encodeParams(val) {
  let params;

  if (this[val] === undefined) {
    return;
  }

  if (val === 'categories') {
    params = this[val].map(v => `${encodeURIComponent(val)}[]=${encodeURIComponent(v)}`);
  } else {
    params = `${encodeURIComponent(val)}=${encodeURIComponent(this[val])}`;
  }

  return params;
}

function encodedParams(params) {
  const query = Object.keys(params)
    .map(encodeParams, params)
    .reduce(flatten, [])
    .join('&');

  return query;
}
