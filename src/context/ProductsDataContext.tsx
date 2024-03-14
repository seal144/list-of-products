import { createContext, PropsWithChildren } from 'react';
import { useSearchParams, SetURLSearchParams } from 'react-router-dom';
import { Product, useProduct, useProductsPage, ProductsPageData } from '../api/productsApi';

interface ProductsDataContextValue {
  productsPage?: ProductsPageData;
  productsPageLoading: boolean;
  productsPageError: Error | null;
  productSearched?: Product;
  productSearchedLoading: boolean;
  productSearchedError: Error | null;
  searchParams?: URLSearchParams;
  setSearchParams?: SetURLSearchParams;
}

export const ProductsDataContext = createContext<ProductsDataContextValue>({
  productsPageLoading: false,
  productsPageError: null,
  productSearchedLoading: false,
  productSearchedError: null,
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

  return (
    <ProductsDataContext.Provider
      value={{
        productsPage,
        productsPageLoading,
        productsPageError,
        productSearched,
        productSearchedLoading,
        productSearchedError,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </ProductsDataContext.Provider>
  );
};

export default ProductsDataProvider;
