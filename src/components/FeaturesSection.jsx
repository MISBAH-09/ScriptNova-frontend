import { motion } from "framer-motion";

function FeaturesSection() {
  const features = [
    {
      title: "AI Blog Generation",
      desc: "Generate full articles, outlines and SEO descriptions using Gemini API.",
    },
    {
      title: "Smart Dashboard",
      desc: "Manage drafts, published blogs and analytics in one place.",
    },
    {
      title: "SaaS Ready",
      desc: "User plans, usage limits and scalable production architecture.",
    },
  ];

  return (
    <section id="features" className="py-24  text-white">
  <div className="bg-slate-900 py-16 text-center">
  <h2 className="text-2xl font-semibold text-white mb-10">
    Powerful Features
  </h2>

  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500 transition">
      <h3 className="text-pink-500 font-semibold">AI Blog Generation</h3>
      <p className="text-gray-400 mt-2">
        Generate full articles with SEO optimization.
      </p>
    </div>

    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500 transition">
      <h3 className="text-pink-500 font-semibold">Smart Dashboard</h3>
      <p className="text-gray-400 mt-2">
        Manage blogs, drafts and analytics in one place.
      </p>
    </div>

    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500 transition">
      <h3 className="text-pink-500 font-semibold">SaaS Ready</h3>
      <p className="text-gray-400 mt-2">
        Scalable architecture for real-world use.
      </p>
    </div>

  </div>
</div>
      {/* <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-4xl font-bold mb-16">Powerful Features</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-indigo-600/30 transition"
            >
              <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}

export default FeaturesSection;
