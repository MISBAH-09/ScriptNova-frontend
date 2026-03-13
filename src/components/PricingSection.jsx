import { motion } from "framer-motion";

function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-4xl font-bold mb-16">Simple Pricing</h3>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gray-900 p-10 rounded-3xl">
            <h4 className="text-2xl font-semibold">Free</h4>
            <p className="text-4xl font-bold mt-4">$0</p>
            <ul className="mt-6 space-y-3 text-gray-400">
              <li>5 AI generations / month</li>
              <li>Basic Dashboard</li>
              <li>Email Support</li>
            </ul>
            <button className="mt-8 w-full bg-indigo-600 py-3 rounded-xl font-semibold">
              Get Started
            </button>
          </div>

          <div className="bg-indigo-600 p-10 rounded-3xl">
            <h4 className="text-2xl font-semibold">Pro</h4>
            <p className="text-4xl font-bold mt-4">$19/mo</p>
            <ul className="mt-6 space-y-3">
              <li>Unlimited AI Generations</li>
              <li>Advanced Analytics</li>
              <li>Priority Support</li>
            </ul>
            <button className="mt-8 w-full bg-black py-3 rounded-xl font-semibold">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


export default PricingSection;
