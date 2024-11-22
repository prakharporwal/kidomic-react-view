import React, { Suspense } from "react";
import { RouterProvider } from "react-router";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingShell from "./components/ui/LoadingShell";
import { appRouter } from "./routes";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { extendTheme } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./configs/graphql/apolloConfig";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
    components: {
      Text: {
        baseStyle: {
          color: "white",
        },
      },
    },
  },
});

export const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ChakraProvider theme={theme}>
          <DarkMode>
            <Provider store={store}>
              <ApolloProvider client={apolloClient}>
                <Suspense fallback={<LoadingShell />}>
                  <RouterProvider router={appRouter} />
                </Suspense>
              </ApolloProvider>
            </Provider>
          </DarkMode>
        </ChakraProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};
