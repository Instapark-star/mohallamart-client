import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HeroSection, FeaturesSection, CTASection } from "../sections";

const Landing = () => {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white scroll-smooth">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Landing;
