import { createContext, PropsWithChildren } from 'react';
import { useSearchParams, SetURLSearchParams } from 'react-router-dom';
import { Product, useProduct, useProductsPage, ProductsPageData } from '../api/productsApi';

interface ProductsDataContextValue {
  productsPage?: ProductsPageData;
  productsPageLoading: boolean;
  productsPageError: Error | null;
  productFiltered?: Product;
  productFilteredLoading: boolean;
  productFilteredError: Error | null;
  searchParams?: URLSearchParams;
  setSearchParams?: SetURLSearchParams;
}

export const ProductsDataContext = createContext<ProductsDataContextValue>({
  productsPageLoading: false,
  productsPageError: null,
  productFilteredLoading: false,
  productFilteredError: null,
});

const ProductsDataProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: productsPage,
    isPending: productsPageLoading,
    error: productsPageError,
  } = useProductsPage(searchParams.get('page'));
  const {
    data: productFiltered,
    isPending: productFilteredLoading,
    error: productFilteredError,
  } = useProduct(searchParams.get('id'));

  return (
    <ProductsDataContext.Provider
      value={{
        productsPage,
        productsPageLoading,
        productsPageError,
        productFiltered,
        productFilteredLoading,
        productFilteredError,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </ProductsDataContext.Provider>
  );
};

export default ProductsDataProvider;
