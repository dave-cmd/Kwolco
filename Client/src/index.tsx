import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { InMemoryCache, ApolloClient, ApolloProvider} from "@apollo/client"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
})
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);