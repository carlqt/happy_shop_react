import apiRoutes from './apiRoutes';

export async function getProduct(id) {
  const url = `${apiRoutes.getProducts}/${id}`;

  const response = await fetch(url);
  return response.json();
}
