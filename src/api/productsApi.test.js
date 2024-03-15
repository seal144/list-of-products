import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ErrorMessages, useProductsPageQuery, useProductQuery } from './productsApi';

describe('useProductsPageQuery', () => {
  let wrapper;

  beforeEach(() => {
    const queryClient = new QueryClient();
    wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('fetches products page data successfully', async () => {
    const { result } = renderHook(() => useProductsPageQuery(), { wrapper });

    await waitFor(() => expect(result.current.data).toBeDefined());
    await waitFor(() => expect(result.current.error).toBeNull());
    await waitFor(() => expect(result.current.isPending).toBeFalsy());
  });

  test('handles errors properly', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ status: 400 });
    const { result } = renderHook(() => useProductsPageQuery(), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(undefined));
    await waitFor(() => expect(result.current.error?.message).toEqual(ErrorMessages.Client));
  });
});

describe('useProductQuery', () => {
  let wrapper;

  beforeEach(() => {
    const queryClient = new QueryClient();
    wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  });

  test('fetches product data successfully', async () => {
    const productId = '1';
    const { result } = renderHook(() => useProductQuery(productId), { wrapper });

    await waitFor(() => expect(result.current.data).toBeDefined());
    await waitFor(() => expect(result.current.error).toBeNull());
    await waitFor(() => expect(result.current.isPending).toBeFalsy());
  });

  test('handles errors properly', async () => {
    const productId = 'invalidProductId';
    const { result } = renderHook(() => useProductQuery(productId), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(undefined));
    await waitFor(() => expect(result.current.error?.message).toEqual(ErrorMessages.NotFound));
  });
});
