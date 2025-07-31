import { motion } from "framer-motion"
import { Button } from "@/components/ui/button" // ✅ Fixed import

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 sm:px-6 md:px-10 text-center relative overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-xl sm:max-w-2xl md:max-w-3xl"
      >
        Welcome to <span className="text-white/80">MohallaMart</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 sm:mt-6 max-w-md sm:max-w-xl"
      >
        Your neighborhood kirana shopping, now premium. Experience the
        smoothest local marketplace.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
      >
        <a href="#features">
          <Button variant="default" className="w-full sm:w-auto">Explore Shops</Button>
        </a>
        <a href="#cta">
          <Button variant="outline" className="w-full sm:w-auto">Learn More</Button>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-6 sm:bottom-10 text-sm text-gray-400 animate-bounce"
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}

export default HeroSection
