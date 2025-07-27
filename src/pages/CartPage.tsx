import { useCartStore } from "@/store/useCartStore"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Trash } from "lucide-react"

const CartPage = () => {
  const { toast } = useToast()
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    toast({
      title: "❌ Removed from Cart",
      description: name,
    })
  }

  const handleConfirm = () => {
    toast({
      title: "✅ Order Placed",
      description: "Your items will be delivered shortly!",
    })
    clearCart()
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-400">🛒 Your cart is empty</p>
      ) : (
        <>
          {/* Cart Items */}
          <section className="max-w-4xl mx-auto space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-neutral-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-400">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => handleRemove(item.id, item.name)}
                    className="w-full sm:w-auto"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </section>

          {/* Subtotal + Checkout */}
          <section className="max-w-4xl mx-auto mt-12 text-center sm:text-right">
            <h3 className="text-xl font-semibold mb-4">
              Subtotal: ₹{subtotal}
            </h3>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">Proceed to Checkout</Button>
              </DialogTrigger>

              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Confirm Order</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to place this order?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button variant="outline" onClick={handleConfirm}>
                    Yes, Place Order
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </>
      )}
    </main>
  )
}

export default CartPage
