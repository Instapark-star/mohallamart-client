// src/components/Layout.tsx
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Toaster } from "@/components/ui/toaster"
import Loader from "@/components/Loader"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="bg-black text-white scroll-smooth min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster />
      <Loader />
    </>
  )
}

export default Layout
