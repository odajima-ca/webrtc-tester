import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import { TopPage } from "../pages/TopPage";

export const AppRoutes: FC = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route element={<TopPage />} path="/" />
    </Route>
  </Routes>
);
