import { motion } from "framer-motion";
import Button from "../../components/Button";

const CTASection = () => {
  return (
    <section
      id="cta"
      className="bg-gradient-to-r from-zinc-900 to-black text-white py-24 px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Join the Mohalla Movement
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Empowering local shops, delivering trust. Be part of a premium
          neighborhood marketplace redefining convenience.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="#register">
            <Button variant="default">Register Your Shop</Button>
          </a>
          <a href="#features">
            <Button variant="outline">Explore Features</Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
