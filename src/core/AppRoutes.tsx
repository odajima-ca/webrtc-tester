import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { QrReaderPage } from "../pages/QrReaderPage";
import { TopPage } from "../pages/TopPage";

export const AppRoutes: FC = () => (
  <Routes>
    <Route element={<TopPage />} path="/" />
    <Route element={<QrReaderPage />} path="/qr-reader" />
  </Routes>
);
