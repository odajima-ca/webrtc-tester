import React, { FC } from "react";

import { SnackbarProvider } from "../providers/SnackbarProvider";
import { AppRoutes } from "./AppRoutes";

export const App: FC = () => (
  <SnackbarProvider>
    <AppRoutes />
  </SnackbarProvider>
);
