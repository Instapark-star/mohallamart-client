import { motion } from "framer-motion"
import { Button } from "@/components/ui/button" // ✅ Correct named import

const CTASection = () => {
  return (
    <section
      id="cta"
      className="bg-gradient-to-r from-zinc-900 to-black text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 sm:mb-6">
          Join the Mohalla Movement
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-2 sm:px-0">
          Empowering local shops, delivering trust. Be part of a premium
          neighborhood marketplace redefining convenience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 flex-wrap">
          <a href="#register">
            <Button variant="default" className="w-full sm:w-auto">
              Register Your Shop
            </Button>
          </a>
          <a href="#features">
            <Button variant="outline" className="w-full sm:w-auto">
              Explore Features
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default CTASection
