import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Layout from './layouts/Layout';
import Home from './pages/Home';
import ProductsDataProvider from './context/ProductsDataContext';

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
