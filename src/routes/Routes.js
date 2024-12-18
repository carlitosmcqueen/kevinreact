import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FakeStore from "../componentes/fakestore";
import ProductDetail from "../componentes/producto";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/productos" replace />} />
      <Route path="/productos" element={<FakeStore />} />
      <Route path="/productos/:id" element={<ProductDetail />} />
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};

export default AppRoutes;
