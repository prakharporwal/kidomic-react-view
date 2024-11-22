import React, { Suspense } from "react";
import { RouterProvider } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingShell from "./components/ui/LoadingShell";
import { appRouter } from "./routes";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./configs/graphql/apolloConfig";
import { mainTheme } from "./configs/theme";

export const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ChakraProvider theme={mainTheme}>
          <Provider store={store}>
            <ApolloProvider client={apolloClient}>
              <Suspense fallback={<LoadingShell />}>
                <RouterProvider router={appRouter} />
              </Suspense>
            </ApolloProvider>
          </Provider>
        </ChakraProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};
