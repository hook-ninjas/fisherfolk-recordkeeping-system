import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/main.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import FisherfolkRecord from './Pages/FisherfolkRecord/FisherfolkRecord';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import FormInput from './Components/Forms/PersonalInfo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="fisherfolk-record" element={<FisherfolkRecord />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="forms"
            element={
              <FormInput
                handleClickOpen={function (): void {
                  throw new Error('Function not implemented.');
                }}
                handleClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
                open={false}
              />
            }
          />{' '}
          {/* will still fix */}
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
