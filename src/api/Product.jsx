import { api } from "./Client";

export const getProduct = (id) => api(`/products/${id}`);

export const getProductsByCategory = (category) =>
  api(`/products/category/${category}`);

export const searchProducts = async (query) => {
  const data = await api(`/products/search?q=${encodeURIComponent(query)}`);

  return data.products;
};

export const getCategories = () => api("/products/categories");
