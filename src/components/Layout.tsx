// src/components/Layout.tsx
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Toaster from "./Toaster"
import Loader from "./Loader"
import { useLoadingStore } from "@/store/useLoadingStore"

const Layout = () => {
  const isLoading = useLoadingStore((state) => state.isLoading)

  return (
    <>
      <Navbar />
      <main
        className="min-h-[80vh]"
        aria-busy={isLoading ? "true" : "false"}
        aria-live="polite"
      >
        {isLoading ? <Loader /> : <Outlet />}
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default Layout
