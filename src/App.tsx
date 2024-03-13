import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Pages/Home';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* TODO - replace this wrapper with mui or Layout Component */}
      <div className="App">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
