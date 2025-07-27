import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/useCartStore"
import { useToast } from "@/hooks/use-toast"

const dummyProducts = [
  {
    id: "p1",
    name: "Parle-G Biscuits",
    price: 10,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: "p2",
    name: "Amul Milk 500ml",
    price: 30,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: "p3",
    name: "Maggie Noodles",
    price: 15,
    image: "https://via.placeholder.com/300x200",
  },
]

const ShopDetailsPage = () => {
  const { id } = useParams()
  const addToCart = useCartStore((state) => state.addToCart)
  const { toast } = useToast()

  const handleAdd = (product: { id: string; name: string; price: number; image: string }) => {
    addToCart(product)
    toast({
      title: "✅ Added to Cart",
      description: `${product.name} added to your cart.`,
    })
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      {/* Shop Header */}
      <section className="max-w-6xl mx-auto mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          Rani General Store
        </h1>
        <p className="text-gray-400 text-base">
          Explore popular products from your favorite local shop.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="bg-neutral-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <p className="text-gray-400 mb-4">₹{product.price}</p>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleAdd(product)}
              className="w-full"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </section>
    </main>
  )
}

export default ShopDetailsPage
