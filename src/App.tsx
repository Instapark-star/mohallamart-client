// src/App.tsx
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Layout from "./components/Layout"
import Landing from "./pages/Landing"
import ShopListPage from "./pages/ShopListPage"
import ShopDetailsPage from "./pages/ShopDetailsPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import MyOrdersPage from "./pages/MyOrdersPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

const AnimatedRoute = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
)

const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<AnimatedRoute><Landing /></AnimatedRoute>}
          />
          <Route
            path="/shops"
            element={<AnimatedRoute><ShopListPage /></AnimatedRoute>}
          />
          <Route
            path="/shop/:id"
            element={<AnimatedRoute><ShopDetailsPage /></AnimatedRoute>}
          />
          <Route
            path="/cart"
            element={<AnimatedRoute><CartPage /></AnimatedRoute>}
          />
          <Route
            path="/checkout"
            element={<AnimatedRoute><CheckoutPage /></AnimatedRoute>}
          />
          <Route
            path="/my-orders"
            element={<AnimatedRoute><MyOrdersPage /></AnimatedRoute>}
          />
          <Route
            path="/login"
            element={<AnimatedRoute><LoginPage /></AnimatedRoute>}
          />
          <Route
            path="/register"
            element={<AnimatedRoute><RegisterPage /></AnimatedRoute>}
          />
          <Route
            path="/profile"
            element={<AnimatedRoute><ProfilePage /></AnimatedRoute>}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
