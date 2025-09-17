import React, { JSX } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "./Navigation";

const queryClient = new QueryClient();

export const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};
