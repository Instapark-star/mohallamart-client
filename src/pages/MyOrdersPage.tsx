// src/pages/MyOrdersPage.tsx
import { useEffect, useState } from "react"
import { fetchMyOrders } from "@/lib/api"
import { useAuthStore } from "@/store/useAuthStore"
import { useToast } from "@/hooks/use-toast"
import DeliveryStatusBadge from "@/components/DeliveryStatusBadge"
import { Button } from "@/components/ui/button"

type Order = {
  _id: string
  items: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }[]
  createdAt: string
  status?: string
}

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?._id) return

      try {
        const data = await fetchMyOrders(user._id)
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
  }, [user?._id])

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-center">My Orders</h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-400">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-neutral-900 p-6 rounded-xl shadow-md space-y-4"
              >
                <div className="flex justify-between text-sm text-gray-400">
                  <span>🧾 Order ID: {order._id.slice(-6).toUpperCase()}</span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {order.items.map((item) => (
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

                {/* ✅ Delivery Status */}
                {order.status && (
                  <div className="text-right">
                    <DeliveryStatusBadge status={order.status} />
                  </div>
                )}

                {/* ⭐ Tip & Rating Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" size="sm">
                    ⭐ Leave a Rating
                  </Button>
                  <Button variant="default" size="sm">
                    💸 Tip Delivery Partner
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default MyOrdersPage
