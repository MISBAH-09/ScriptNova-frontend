import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          AI Powered Blogging <span className="text-indigo-500">Made Simple</span>
        </h2>
        <p className="mt-6 text-lg text-gray-300">
          Generate high-quality SEO optimized blogs using Gemini AI.
          Create, edit, publish and scale your content like a pro.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <button className="bg-indigo-600 px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-500 transition">
            Start Writing
          </button>
          <button className="border border-gray-500 px-6 py-3 rounded-2xl hover:bg-gray-800 transition">
            Watch Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;