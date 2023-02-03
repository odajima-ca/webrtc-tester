import React, { FC, useEffect } from "react";
import { use100vh } from "react-div-100vh";
import VConsole from "vconsole";

import { MediaStreamProvider } from "../providers/MediaStreamProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import { AppRoutes } from "./AppRoutes";

export const App: FC = () => {
  const height = use100vh();

  useEffect(() => {
    const vConsole = new VConsole({
      onReady: () => {
        if (height) {
          vConsole.setSwitchPosition(16, height - 52);
        }
      },
    });

    return () => {
      vConsole.destroy();
    };
  }, [height]);

  return (
    <SnackbarProvider>
      <MediaStreamProvider>
        <AppRoutes />
      </MediaStreamProvider>
    </SnackbarProvider>
  );
};
