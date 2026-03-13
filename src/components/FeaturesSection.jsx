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
    <section id="features" className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
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
      </div>
    </section>
  );
}

export default FeaturesSection;
