import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./Pages/Homepage.tsx";
import SectionCards from "./Pages/SectionCards.tsx";
import Edition from "./Pages/Edition.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage id="App__sectionContainer" />,
      },
      {
        path: "/section/:id",
        element: <SectionCards id="App__sectionCards" />,
      },
      {
        path: "/section/:id/edition",
        element: <Edition id="App__edition" />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
