// src/pages/ShopDetailsPage.tsx

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useCartStore } from "../store/useCartStore"
import { useToast } from "../hooks/use-toast"
import { fetchShopProducts } from "../lib/api"
import type { Product } from "../lib/api" // ✅ type-only import for strict TS

const ShopDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const addToCart = useCartStore((state) => state.addToCart)
  const { toast } = useToast()

  const handleAdd = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
    })

    toast({
      title: "✅ Added to Cart",
      description: `${product.name} added to your cart.`,
    })
  }

  useEffect(() => {
    const loadProducts = async () => {
      if (!id) return
      try {
        const data = await fetchShopProducts(id)
        setProducts(data)
      } catch (err) {
        setError("Failed to load products.")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [id])

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Shop Header */}
      <section className="max-w-6xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
          Shop Details
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Explore products from your neighborhood shop.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-gray-400 text-center">🔄 Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-center">🚫 No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-neutral-900 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-xl mb-4"
                />
                <h2 className="text-base sm:text-lg font-semibold mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  ₹{product.price}
                </p>
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
          </div>
        )}
      </section>
    </main>
  )
}

export default ShopDetailsPage
