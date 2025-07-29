import { useEffect, useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useToast } from "../hooks/use-toast"
import DeliveryStatusBadge from "../components/DeliveryStatusBadge"
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
import { Label } from "../components/ui/label"

type OrderItem = {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

type Order = {
  _id: string
  items: OrderItem[]
  createdAt: string
  status?: string
  hasRated?: boolean
  hasTipped?: boolean
}

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { toast } = useToast()

  const token = useAuthStore((state) => state.user?.token)

  const [selectedRating, setSelectedRating] = useState<number>(5)
  const [selectedTip, setSelectedTip] = useState<string>("")
  const [activeOrderId, setActiveOrderId] = useState<string>("")

  useEffect(() => {
    const loadOrders = async () => {
      if (!token) return

      try {
        const res = await fetch("/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Failed to fetch orders")
        const data: Order[] = await res.json()
        setOrders(data)
      } catch (err) {
        toast({
          title: "❌ Failed to Load Orders",
          description: "Please try again later.",
        })
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [token, toast])

  const handleSubmitRating = () => {
    toast({
      title: "⭐ Thanks for Rating!",
      description: `You rated ${selectedRating} star(s).`,
    })

    setOrders((prev) =>
      prev.map((o) =>
        o._id === activeOrderId ? { ...o, hasRated: true } : o
      )
    )
  }

  const handleSubmitTip = () => {
    toast({
      title: "💸 Tip Sent!",
      description: `You tipped ₹${selectedTip}`,
    })

    setOrders((prev) =>
      prev.map((o) =>
        o._id === activeOrderId ? { ...o, hasTipped: true } : o
      )
    )
    setSelectedTip("")
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-center">My Orders</h1>

        {loading ? (
          <p className="text-center text-gray-400">🔄 Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-400">🚫 You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order: Order) => (
              <div
                key={order._id}
                className="bg-neutral-900 p-6 rounded-xl shadow-md space-y-4"
              >
                <div className="flex justify-between text-sm text-gray-400">
                  <span>🧾 Order ID: {order._id.slice(-6).toUpperCase()}</span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {order.items.map((item: OrderItem) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.status && (
                  <div className="text-right">
                    <DeliveryStatusBadge status={order.status} />
                  </div>
                )}

                {order.status === "delivered" && (
                  <div className="flex justify-end gap-3 pt-2">
                    {!order.hasRated && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedRating(5)
                              setActiveOrderId(order._id)
                            }}
                          >
                            ⭐ Leave a Rating
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white text-black">
                          <DialogHeader>
                            <DialogTitle>Rate This Order</DialogTitle>
                            <DialogDescription>Select a rating:</DialogDescription>
                          </DialogHeader>
                          <div className="flex gap-2 py-4 justify-center">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <Button
                                key={num}
                                variant={selectedRating === num ? "default" : "outline"}
                                onClick={() => setSelectedRating(num)}
                              >
                                {num} ⭐
                              </Button>
                            ))}
                          </div>
                          <DialogFooter>
                            <Button onClick={handleSubmitRating}>Submit Rating</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    {!order.hasTipped && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => setActiveOrderId(order._id)}
                          >
                            💸 Tip Delivery Partner
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white text-black">
                          <DialogHeader>
                            <DialogTitle>Send a Tip</DialogTitle>
                            <DialogDescription>
                              Optional tip for your delivery partner
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-2">
                            <Label htmlFor="tip">Tip Amount (₹)</Label>
                            <Input
                              type="number"
                              id="tip"
                              placeholder="e.g. 20"
                              value={selectedTip}
                              onChange={(e) => setSelectedTip(e.target.value)}
                            />
                          </div>
                          <DialogFooter>
                            <Button onClick={handleSubmitTip}>Send Tip</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default MyOrdersPage
