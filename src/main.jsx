import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./router/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <App />
                {/* <ReactQueryDevtools /> */}
            </QueryClientProvider>
        </HelmetProvider>
    </StrictMode>
);
