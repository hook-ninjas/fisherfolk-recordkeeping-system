import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Components/Dashboard/Dashboard';
import FisherfolkRecord from './Components/FisherfolkRecord/FisherfolkRecord';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import Login from './Components/Forms/LoginForm';
import FisherfolkViewProfile from './Components/FisherfolkRecord/FisherfolkViewProfile';
import FisherfolkBoatRecord from './Components/FisherfolkRecord/FisherfolkBoatRecord';
import FisherfolkGearRecord from './Components/FisherfolkRecord/FisherfolkGearRecord';
import CreateAccount from './Components/Forms/CreateAccountForm';
import ProtectedRoute from './Components/NotAuthorizedPage/ProtectedRoute';

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);

const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<App />}>
              <Route path="dashboard" index element={<Dashboard />} />
              <Route path="fisherfolk-record" element={<FisherfolkRecord />} />
              <Route
                path="fisherfolk-profile/:id"
                element={<FisherfolkViewProfile />}
              />
              <Route
                path="fisherfolk-boats"
                element={<FisherfolkBoatRecord />}
              />
              <Route
                path="fisherfolk-gears"
                element={<FisherfolkGearRecord />}
              />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
