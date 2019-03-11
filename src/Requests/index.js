import apiRoutes from './apiRoutes';

export async function getProducts(filters = {}) {
  const filterParams = {
    ...filters,
  }

  const url = `${apiRoutes.getProducts}?${encodedParams(filterParams)}`

  const response = await fetch(url)
  return response.json();
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
