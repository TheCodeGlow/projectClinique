import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserProvider } from "./contexts/UserContext";
import App from "./App";
import "./styles.css";

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <App />
    </UserProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
