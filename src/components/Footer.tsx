const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} MohallaMart. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms
          </a>
          <a href="#" className="hover:text-white transition">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
