import React, { FC } from "react";

import { MediaStreamProvider } from "../providers/MediaStreamProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import { AppRoutes } from "./AppRoutes";

export const App: FC = () => (
  <SnackbarProvider>
    <MediaStreamProvider>
      <AppRoutes />
    </MediaStreamProvider>
  </SnackbarProvider>
);
