import React, { Suspense } from "react";
import { RouterProvider } from "react-router";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingShell from "./components/ui/LoadingShell";
import { appRouter } from "./routes";
import store from "./redux/store/store";
import { Provider } from "react-redux";

export const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ChakraProvider>
          <DarkMode>
            <Provider store={store}>
              <Suspense fallback={<LoadingShell />}>
                <RouterProvider router={appRouter} />
              </Suspense>
            </Provider>
          </DarkMode>
        </ChakraProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};
