import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { FC } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import { theme } from "./config/theme";
import { App } from "./core/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
