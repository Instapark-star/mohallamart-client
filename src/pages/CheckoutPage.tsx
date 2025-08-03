import { useState } from "react"
import { useCartStore } from "../store/useCartStore"
import { useAuthStore } from "../store/useAuthStore"
import { useToast } from "../hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import type { CartItem } from "../lib/api" // ✅ Type-only import

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items as CartItem[])
  const clearCart = useCartStore((state) => state.clearCart)
  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  )

  const { toast } = useToast()
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePlaceOrder = async () => {
    if (!name || !phone || !address) {
      return toast({
        title: "⚠️ Missing Info",
        description: "Please fill out all fields.",
      })
    }

    if (!token) {
      return toast({
        title: "🔐 Not Logged In",
        description: "Please log in before placing an order.",
      })
    }

    setLoading(true)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      const res = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerName: name,
          phone,
          latitude,
          longitude,
          items,
        }),
      })

      if (!res.ok) throw new Error("Order creation failed")

      toast({
        title: "✅ Order Placed",
        description: "Your items will be delivered soon!",
      })

      clearCart()
      setName("")
      setPhone("")
      setAddress("")
      navigate("/my-orders")
    } catch (err: any) {
      console.error("Order Error:", err)
      toast({
        title: "❌ Failed to Place Order",
        description:
          err?.message?.includes("user denied")
            ? "Location permission is required to place order."
            : "Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Delivery Form */}
        <section className="bg-neutral-900 p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Delivery Information
          </h2>

          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Textarea
            placeholder="Full Delivery Address"
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </section>

        {/* Right: Order Summary */}
        <section className="bg-neutral-900 p-6 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">Order Summary</h2>

          {items.length === 0 ? (
            <p className="text-gray-400">🛒 Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item: CartItem) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-lg font-semibold">
                Subtotal: ₹{subtotal}
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" disabled={loading}>
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-white text-black">
                  <DialogHeader>
                    <DialogTitle>Confirm Order</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to place this order?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={handlePlaceOrder}
                      variant="default"
                      disabled={loading}
                    >
                      Confirm & Pay
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default CheckoutPage
