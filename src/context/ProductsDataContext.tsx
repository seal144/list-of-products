import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useSearchParams, SetURLSearchParams } from 'react-router-dom';
import { Product, useProduct, useProductsPage, ProductsPageData } from '../api/productsApi';

interface ProductsDataContextValue {
  productsPage?: ProductsPageData;
  productsPageLoading: boolean;
  productSearched?: Product;
  productSearchedLoading: boolean;
  fetchError: Error | null;
  searchParams?: URLSearchParams;
  setSearchParams?: SetURLSearchParams;
}

export const ProductsDataContext = createContext<ProductsDataContextValue>({
  productsPageLoading: false,
  productSearchedLoading: false,
  fetchError: null,
});

const ProductsDataProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: productsPage,
    isPending: productsPageLoading,
    error: productsPageError,
  } = useProductsPage(searchParams.get('page'));
  const {
    data: productSearched,
    isPending: productSearchedLoading,
    error: productSearchedError,
  } = useProduct(searchParams.get('id'));
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    if (productSearchedError) {
      return setFetchError(productSearchedError);
    }
    if (productsPageError) {
      return setFetchError(productsPageError);
    }
    setFetchError(null);
  }, [productSearchedError, productsPageError]);

  return (
    <ProductsDataContext.Provider
      value={{
        productsPage,
        productsPageLoading,
        productSearched,
        productSearchedLoading,
        fetchError,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </ProductsDataContext.Provider>
  );
};

export default ProductsDataProvider;
