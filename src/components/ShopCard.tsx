// src/components/ShopCard.tsx
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/store/useCartStore"

type ShopCardProps = {
  id: string
  name: string
  description: string
  image: string
}

const ShopCard = ({ id, name, description, image }: ShopCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const { toast } = useToast()

  const handleAdd = () => {
    addToCart({
      id,
      name,
      price: 20, // 💰 dummy flat price for now
      image,
    })

    toast({
      title: "✅ Added to Cart",
      description: `${name} added to your cart.`,
    })
  }

  return (
    <div className="relative group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02]">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <h2 className="text-xl font-semibold mb-1">{name}</h2>
      <p className="text-gray-400 text-sm mb-3">{description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>⭐ 4.5</span>
        <span>📍 1.5km</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link to={`/shop/${id}`}>
          <Button variant="outline" className="w-full">
            View Shop
          </Button>
        </Link>
        <Button variant="default" className="w-full" onClick={handleAdd}>
          Add to Cart
        </Button>
      </div>

      <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:ring-1 group-hover:ring-white/20 transition-all" />
    </div>
  )
}

export default ShopCard
