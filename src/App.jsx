// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ProductsList from "./components/ProductsList";
import Banner from "./components/Banner";
import Register from "./components/Register";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./admin/AddProduct";
import Home from "./components/Home";
import AdminProducts from "./admin/AdminProducts";
import EditProduct from "./admin/EditProduct";
import DeleteProduct from "./admin/DeleteProduct";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import OrdersPage from "./components/OrdersPage";
import OrderDetailsPage from "./components/OrderDetailsPage";
import Categories from "./components/Categories";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


function AppLayout() {
  const location = useLocation();

  // Hide Header and Banner on login/register pages
  const hideUI =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideUI && <Header />}

      <Routes>
        {/* Public routes */}
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       <Route path="/admin/add-product" element={<AddProduct />} />
       <Route path="/admin/products" element={<AdminProducts />} />
     <Route path="/admin/products/:id/edit" element={<EditProduct />} />
     <Route path = "/admin/products/:id/delete"element = {<DeleteProduct />}/>
     <Route path="/products/:id" element={<ProductDetails />} />
     <Route path="/cart" element={<CartPage />} />
     <Route path="/orders" element={<OrdersPage />} />
     <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
     <Route path = "/categories" element = {<Categories />} />
     <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />









        {/* Protected routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsList />
            </ProtectedRoute>
          }
        />

        {/* Home route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {/* <Banner /> */}
            </ProtectedRoute>
          }
        />
      </Routes>

     
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
