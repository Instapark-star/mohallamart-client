// src/sections/FeaturesSection/FeaturesSection.tsx

import { motion } from "framer-motion";
import { Lightbulb, Truck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Smart Shopping",
    desc: "Curated kirana suggestions powered by local trends and smart tags.",
  },
  {
    icon: Truck,
    title: "Fast Local Delivery",
    desc: "Real-time order tracking, fulfilled by neighborhood helpers.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Shops",
    desc: "All verified MohallaMart vendors with transparent pricing.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-black text-white py-24 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          Why MohallaMart?
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Reimagining the neighborhood store experience with a tech-first premium layer.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-neutral-900 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm md:text-base">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
