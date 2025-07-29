// src/components/Loader.tsx
import { useLoadingStore } from "@/store/useLoadingStore"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const Loader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading)

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-black/80 backdrop-blur-sm transition-opacity duration-300",
        isLoading ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      <Loader2 className="h-10 w-10 text-white animate-spin" />
    </div>
  )
}

export default Loader
