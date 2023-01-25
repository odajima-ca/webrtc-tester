import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { DevicePage } from "../pages/DevicePage";
import { TopPage } from "../pages/TopPage";

export const AppRoutes: FC = () => (
  <Routes>
    <Route element={<TopPage />} path="/" />
    <Route element={<DevicePage />} path="/device" />
  </Routes>
);
