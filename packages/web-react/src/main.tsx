import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Components/Dashboard/Dashboard';
import FisherfolkRecord from './Components/FisherfolkRecord/FisherfolkRecord';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="dashboard" index element={<Dashboard />} />
          <Route path="fisherfolk-record" element={<FisherfolkRecord />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
