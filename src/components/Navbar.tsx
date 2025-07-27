// src/components/Navbar.tsx
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/store/useAuthStore"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const cartItems = useCartStore((state) => state.items)
  const increaseQty = useCartStore((state) => state.increaseQty)
  const decreaseQty = useCartStore((state) => state.decreaseQty)
  const removeItem = useCartStore((state) => state.removeFromCart)

  const { toast } = useToast()
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    toast({ title: "👋 Logged Out", description: "Come back soon!" })
    navigate("/")
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-white font-semibold text-xl tracking-wide hover:opacity-80 transition">
          MohallaMart
        </Link>

        <div className="hidden md:flex gap-6 text-white text-sm font-medium">
          <Link to="/" className="hover:opacity-70 transition">Home</Link>
          <Link to="/shops" className="hover:opacity-70 transition">Shops</Link>
          <Link to="/my-orders" className="hover:opacity-70 transition">My Orders</Link>
          <Link to="/about" className="hover:opacity-70 transition">About</Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* 🛒 Cart Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="text-white border-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cartItems.length})
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-neutral-900 text-white w-[90vw] sm:w-96">
              <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-sm">Your cart is empty.</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">₹{item.price}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Button size="icon" variant="secondary" className="w-6 h-6" onClick={() => {
                              decreaseQty(item.id)
                              toast({ title: "➖ Decreased Quantity", description: item.name })
                            }}>
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <Button size="icon" variant="secondary" className="w-6 h-6" onClick={() => {
                              increaseQty(item.id)
                              toast({ title: "➕ Increased Quantity", description: item.name })
                            }}>
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button size="icon" variant="destructive" className="w-6 h-6 ml-2" onClick={() => {
                              removeItem(item.id)
                              toast({ title: "❌ Removed from Cart", description: item.name })
                            }}>
                              <Trash className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <p className="text-base font-semibold mb-2">Subtotal: ₹{subtotal}</p>
                    <Button variant="default" className="w-full" onClick={() => navigate("/checkout")}>
                      Checkout
                    </Button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>

          {/* 🔐 Auth Links */}
          {user ? (
            <div className="flex items-center gap-3 text-sm text-white">
              <Button variant="ghost" onClick={() => navigate("/profile")}>Profile</Button>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-sm text-white">
              <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
              <Button variant="outline" onClick={() => navigate("/register")}>Register</Button>
            </div>
          )}

          {/* ☰ Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Links */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/80 backdrop-blur-sm px-4 pt-2 pb-4 text-white"
          >
            <Link to="/" className="block py-2" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shops" className="block py-2" onClick={() => setMenuOpen(false)}>Shops</Link>
            <Link to="/my-orders" className="block py-2" onClick={() => setMenuOpen(false)}>My Orders</Link>
            <Link to="/about" className="block py-2" onClick={() => setMenuOpen(false)}>About</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
