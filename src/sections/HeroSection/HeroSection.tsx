import { motion } from "framer-motion";
import Button from "../../components/Button";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-6 relative overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-4xl md:text-6xl font-semibold tracking-tight text-center max-w-3xl"
      >
        Welcome to <span className="text-white/80">MohallaMart</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-400 mt-6 text-center max-w-xl"
      >
        Your neighborhood kirana shopping, now premium. Experience the
        smoothest local marketplace.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="flex justify-center gap-4 mt-8"
      >
        <a href="#features">
          <Button variant="default">Explore Shops</Button>
        </a>
        <a href="#cta">
          <Button variant="outline">Learn More</Button>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-10 text-sm text-gray-400 animate-bounce"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
};

export default HeroSection;
