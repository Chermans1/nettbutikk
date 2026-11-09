import axios from 'axios';

const client = axios.create({ baseURL: 'https://dummyjson.com' });
export const PAGE_SIZE = 12;

export async function getCategories() {
  const response = await client.get('/products/categories');
  return response.data;
}

export async function getProduct(id) {
  const response = await client.get(`/products/${encodeURIComponent(id)}`);
  return response.data;
}

export async function getProducts({ search, category, page, sort }) {
  const skip = (page - 1) * PAGE_SIZE;
  const params = { limit: PAGE_SIZE, skip };

  if (sort !== 'default') {
    const [sortBy, order] = sort.split('-');
    params.sortBy = sortBy;
    params.order = order;
  }

  // The API has no endpoint combining search and category.
  // Fetch the category, filter with JavaScript, then select the current page.
  if (search && category) {
    const response = await client.get(`/products/category/${encodeURIComponent(category)}`, {
      params: { ...params, limit: 0, skip: 0 },
    });
    const query = search.toLowerCase();
    const matches = response.data.products.filter(product => {
      const text = `${product.title} ${product.description}`;
      return text.toLowerCase().includes(query);
    });
    return {
      products: matches.slice(skip, skip + PAGE_SIZE),
      total: matches.length,
    };
  }

  let path = '/products';
  if (category) {
    path = `/products/category/${encodeURIComponent(category)}`;
  } else if (search) {
    path = '/products/search';
    params.q = search;
  }

  const response = await client.get(path, { params });
  return response.data;
}
