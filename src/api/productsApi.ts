import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  ['pantone_value']: string;
}

export interface ProductsPageData {
  page: number;
  ['per_page']: number;
  ['total_pages']: number;
  data: Product[];
}

interface ProductData {
  data: Product;
}

const queryFn = (url: string) => () => fetch(url).then((res) => res.json());

export const useProductsPage = (page?: string | null) => {
  page = page ? page : '1';
  const queryURL = `https://reqres.in/api/products?per_page=5&page=${page}`;
  const queryKey = [`products-page-${page}`];

  const { data, isPending, error } = useQuery<ProductsPageData>({ queryKey, queryFn: queryFn(queryURL) });

  return { data, isPending, error };
};

export const useProduct = (id?: string | null) => {
  const queryURL = id ? `https://reqres.in/api/products?id=${id}` : '';
  const queryKey = id ? [`products-id-${id}`] : ['blank'];

  const { data, isPending, error } = useQuery<ProductData>({ queryKey, queryFn: queryFn(queryURL) });

  return { data: data?.data, isPending, error };
};
