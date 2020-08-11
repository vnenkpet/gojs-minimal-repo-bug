import React from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ProjectView } from "./components/ProjectView/ProjectView";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <header className="App-header">
          <ProjectView />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
