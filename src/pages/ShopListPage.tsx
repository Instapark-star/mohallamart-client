// src/pages/ShopListPage.tsx
import { useEffect, useState } from "react"
import ShopCard from "../components/ShopCard"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { fetchShops } from "@/lib/api"

type Shop = {
  id: string
  name: string
  description: string
  image: string
}

const FilterSidebar = () => (
  <div className="space-y-6 p-2 md:p-0">
    <div>
      <h4 className="text-sm font-medium mb-2 text-gray-400">Shop Type</h4>
      <ul className="space-y-2 text-sm">
        <li><label><input type="checkbox" className="mr-2" /> Kirana</label></li>
        <li><label><input type="checkbox" className="mr-2" /> Snacks</label></li>
        <li><label><input type="checkbox" className="mr-2" /> Essentials</label></li>
      </ul>
    </div>
    <div>
      <h4 className="text-sm font-medium mb-2 text-gray-400">Distance</h4>
      <ul className="space-y-2 text-sm">
        <li><label><input type="radio" name="distance" className="mr-2" /> Within 2km</label></li>
        <li><label><input type="radio" name="distance" className="mr-2" /> Within 5km</label></li>
      </ul>
    </div>
    <div>
      <h4 className="text-sm font-medium mb-2 text-gray-400">Tags</h4>
      <ul className="space-y-2 text-sm">
        <li><label><input type="checkbox" className="mr-2" /> Open Now</label></li>
        <li><label><input type="checkbox" className="mr-2" /> Express Delivery</label></li>
      </ul>
    </div>
  </div>
)

const ShopListPage = () => {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadShops = async () => {
      try {
        const data = await fetchShops()
        setShops(data)
      } catch (err: any) {
        setError("Failed to load shops")
      } finally {
        setLoading(false)
      }
    }

    loadShops()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[260px_1fr] gap-10">
        {/* Sidebar Filters for Desktop */}
        <aside className="hidden md:block bg-neutral-900 rounded-2xl p-6 h-fit shadow-md">
          <h3 className="text-xl font-semibold mb-6">Filters</h3>
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-center md:text-left">
              Explore Mohalla Shops
            </h1>

            {/* Mobile Filter Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black text-white">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filters</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Loading, Error, or Shop Grid */}
          {loading ? (
            <p className="text-gray-400 text-center">🔄 Loading shops...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : shops.length === 0 ? (
            <p className="text-gray-400 text-center">🚫 No shops found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {shops.map((shop) => (
                <ShopCard key={shop.id} {...shop} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ShopListPage
