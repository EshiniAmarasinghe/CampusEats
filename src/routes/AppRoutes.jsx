import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MenuPage from "../features/menu/pages/MenuPage";
import DishDetailPage from "../features/menu/pages/DishDetailPage";
import Spinner from "../components/Spinner";

// Lazy route: the order form's code is only downloaded when it is visited.
const OrderPage = lazy(() => import("../features/menu/pages/OrderPage"));

function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/dish/:id" element={<DishDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<p className="error">404 — Page not found</p>} />
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
