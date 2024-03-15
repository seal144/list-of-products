import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface ProductsPageData {
  page: number;
  per_page: number;
  total_pages: number;
  data: Product[];
}

interface ProductData {
  data: Product;
}

export enum ErrorMessages {
  NotFound = '404 - not found',
  Client = 'client error',
  Server = 'server error',
}

const queryFn = (url: string, setError: (error: Error | null) => void) => () => {
  setError(null);
  return fetch(url).then((res) => {
    if (res.status < 400) {
      return res.json();
    } else if (res.status === 404) {
      setError(new Error(ErrorMessages.NotFound));
      return res.json();
    } else if (res.status < 500) {
      setError(new Error(ErrorMessages.Client));
      return res.json();
    }
    setError(new Error(ErrorMessages.Server));
    return res.json();
  });
};

export const useProductsPageQuery = (page?: string | null) => {
  page = page ? page : '1';
  const [error, setError] = useState<Error | null>(null);
  const queryURL = `https://reqres.in/api/products?per_page=5&page=${page}`;
  const queryKey = [`products-page-${page}`];

  const { data, isPending } = useQuery<ProductsPageData>({ queryKey, queryFn: queryFn(queryURL, setError) });

  return { data, isPending, error };
};

export const useProductQuery = (id?: string | null) => {
  const [error, setError] = useState<Error | null>(null);
  const queryURL = id ? `https://reqres.in/api/products?id=${id}` : '';
  const queryKey = id ? [`products-id-${id}`] : ['blank'];

  const { data, isPending } = useQuery<ProductData>({
    queryKey,
    queryFn: queryFn(queryURL, setError),
  });

  return { data: data?.data, isPending, error };
};
