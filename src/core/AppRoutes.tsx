import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import { CameraPage } from "../pages/CameraPage";
import { DevicePage } from "../pages/DevicePage";
import { TopPage } from "../pages/TopPage";

export const AppRoutes: FC = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route element={<TopPage />} path="/" />
      <Route element={<CameraPage />} path="/camera" />
      <Route element={<DevicePage />} path="/device" />
    </Route>
  </Routes>
);
