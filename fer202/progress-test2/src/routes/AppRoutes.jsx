import { Route, Routes, Navigate } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailsPage from '../pages/ProductDetails';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}