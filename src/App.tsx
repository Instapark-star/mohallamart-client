// src/App.tsx
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion, easeInOut } from "framer-motion" // ✅ Combined import

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
import NotFoundPage from "./pages/NotFound" // ✅ Updated import for renamed file

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: easeInOut,
    },
  },
}

const AnimatedRoute = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
)

const App = () => {
  const location = useLocation()
  const routeKey = location.pathname.split("/")[1] || "/"

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={routeKey}>
        <Route element={<Layout />}>
          <Route path="/" element={<AnimatedRoute><Landing /></AnimatedRoute>} />
          <Route path="/shops" element={<AnimatedRoute><ShopListPage /></AnimatedRoute>} />
          <Route path="/shop/:id" element={<AnimatedRoute><ShopDetailsPage /></AnimatedRoute>} />
          <Route path="/cart" element={<AnimatedRoute><CartPage /></AnimatedRoute>} />
          <Route path="/checkout" element={<AnimatedRoute><CheckoutPage /></AnimatedRoute>} />
          <Route path="/my-orders" element={<AnimatedRoute><MyOrdersPage /></AnimatedRoute>} />
          <Route path="/login" element={<AnimatedRoute><LoginPage /></AnimatedRoute>} />
          <Route path="/register" element={<AnimatedRoute><RegisterPage /></AnimatedRoute>} />
          <Route path="/profile" element={<AnimatedRoute><ProfilePage /></AnimatedRoute>} />

          {/* ✅ 404 Fallback Route */}
          <Route path="*" element={<AnimatedRoute><NotFoundPage /></AnimatedRoute>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
