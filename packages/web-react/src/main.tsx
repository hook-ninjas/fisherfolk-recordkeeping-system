import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Components/Dashboard/Dashboard';
import FisherfolkRecord from './Components/FisherfolkRecord/FisherfolkRecord';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Login from './Components/Forms/LoginForm';
import FisherfolkViewProfile from './Components/FisherfolkRecord/FisherfolkViewProfile';
import FisherfolkBoatRecord from './Components/FisherfolkRecord/FisherfolkBoatRecord';
import FisherfolkGearRecord from './Components/FisherfolkRecord/FisherfolkGearRecord';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="dashboard" index element={<Dashboard />} />
            <Route path="fisherfolk-record" element={<FisherfolkRecord />} />
            <Route path="fisherfolk-profile/:id" element={<FisherfolkViewProfile />}/>
            <Route path="fisherfolk-boats" element={<FisherfolkBoatRecord />} />
            <Route path="fisherfolk-gears" element={<FisherfolkGearRecord />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
