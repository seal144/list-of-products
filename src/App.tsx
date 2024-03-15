import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Layout from './layouts/Layout';
import Home from './views/Home';
import ProductsDataProvider from './context/ProductsDataContext';

// BASIC TASK REQUIREMENTS IMPLEMENTED:
// - table with products (5 items per page) - ProductsTable.tsx
// - pagination and search by id input (only numbers) - ProductsTable.tsx
// - modal with all items data - ProductModal.tsx
// - displaying proper error message for user if endpoint returns 4XX, 5XX - ProductsTable.tsx
// - filtering and pagination is performed within the API
// OPTIONAL TASK REQUIREMENTS IMPLEMENTED:
// - pagination and filtering is reflected in the URL - so user can share specific data
// - unit tests - productsApi.test.js and parseKey.test.js
// - global state handled with Context - ProductsDataContext.tsx
// - debouncing used - custom for "Search by ID" feature in ProductsTable.tsx
// TECH STACK: React, Tanstack/react-query, Material UI, Testing library

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ProductsDataProvider>
          <ThemeProvider theme={darkTheme}>
            <Layout>
              <Home />
            </Layout>
          </ThemeProvider>
        </ProductsDataProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
