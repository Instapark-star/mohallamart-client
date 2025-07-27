// src/App.tsx
import { Routes, Route } from "react-router-dom"
import Layout from "../components/Layout"
import Landing from "../pages/Landing"
import ShopListPage from "../pages/ShopListPage"
import ShopDetailsPage from "../pages/ShopDetailsPage"
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"
import MyOrdersPage from "../pages/MyOrdersPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ProfilePage from "../pages/ProfilePage"

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/shops" element={<ShopListPage />} />
        <Route path="/shop/:id" element={<ShopDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
