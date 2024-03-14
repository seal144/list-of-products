import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home';
import ProductsDataProvider from './context/ProductsDataContext';
// TODO - replace this styles with mui
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ProductsDataProvider>
          {/* TODO - replace this wrapper with mui or Layout Component */}
          <div className="App">
            <Home />
          </div>
        </ProductsDataProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
