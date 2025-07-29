// src/pages/CheckoutPage.tsx
import { useState } from "react"
import { useCartStore } from "../store/useCartStore"
import { useToast } from "../hooks/use-toast"
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

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items as CartItem[])
  const clearCart = useCartStore((state) => state.clearCart)
  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  )

  const { toast } = useToast()

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

    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          deliveryAddress: address,
          items,
        }),
      })

      if (!res.ok) throw new Error("Order failed")

      toast({
        title: "✅ Order Placed",
        description: "Your items will be delivered to your address!",
      })

      clearCart()
      setName("")
      setPhone("")
      setAddress("")
    } catch (error) {
      toast({
        title: "❌ Failed to Place Order",
        description: "Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      <h1 className="text-3xl font-semibold text-center mb-10">Checkout</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Delivery Form */}
        <section className="bg-neutral-900 p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>

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
          <h2 className="text-xl font-semibold">Order Summary</h2>

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

              <div className="text-lg font-semibold">Subtotal: ₹{subtotal}</div>

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
