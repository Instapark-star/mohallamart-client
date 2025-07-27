import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/useCartStore"
import { ShoppingCart } from "lucide-react"

const CartDrawer = () => {
  const cart = useCartStore((state) => state.cart)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ShoppingCart className="w-4 h-4" />
          Cart ({cart.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-neutral-900 text-white">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription className="text-gray-400">
            Review items before checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cart.length === 0 && <p className="text-sm text-gray-400">Your cart is empty.</p>}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border-b border-neutral-700 pb-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">₹{item.price} × {item.quantity}</p>
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-neutral-700 pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <Button variant="default" className="w-full mt-4">
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartDrawer
