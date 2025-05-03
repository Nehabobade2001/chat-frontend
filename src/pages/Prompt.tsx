import React from 'react'
import { ShoppingCart } from 'lucide-react';

type Plan = {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
  };
  
  const plans: Plan[] = [
    {
      name: 'Basic',
      price: '$29/mo',
      features: ['1 User', 'Basic Analytics', 'Email Support'],
    },
    {
      name: 'Pro',
      price: '$59/mo',
      features: ['5 Users', 'Advanced Analytics', 'Priority Support'],
      isPopular: true,
    },
    {
      name: 'Premium',
      price: '$99/mo',
      features: ['Unlimited Users', 'All Features', '24/7 Support'],
    },
  ];

const Prompt = () => {
  return (
    <div className="min-h-screen  text-white bg-black font-sans">
      <header className="w-full flex items-center justify-between    shadow-sm z-50">
      <div className="text-2xl font-bold tracking-tight text-white">LUXE</div>
      <nav className="hidden md:flex space-x-8 font-medium">
        <a href="#" className="hover:text-gray-600">New</a>
        <a href="#" className="hover:text-gray-600">Women</a>
        <a href="#" className="hover:text-gray-600">Men</a>
        <a href="#" className="hover:text-gray-600">Accessories</a>
      </nav>
      <div className="cursor-pointer">
        <ShoppingCart size={24} />
      </div>
    </header>
      {/* Hero */}
      <section className="relative w-full h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599785209790-03ed22f944d9?auto=format&fit=crop&w=1470&q=80')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 md:px-24 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">New Season Collection</h1>
        <p className="text-lg md:text-xl max-w-xl mb-6">
          Discover our curated selection of premium pieces for the modern wardrobe.
        </p>
        <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition font-medium">
          Shop Now
        </button>
      </div>
    </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-white">Features:</h3>
        <ol className="space-y-4 text-lg text-gray-300 list-decimal list-inside">
          <li>A hero section with a featured product</li>
          <li>A curated product grid with hover effects</li>
          <li>A minimalist navigation bar with cart</li>
          <li>Product cards with clean typography and subtle animations</li>
        </ol>
      </section>

     
      <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h2>
        <p className="text-center text-gray-600 mb-12">Simple pricing. No hidden fees.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-2xl p-8 shadow-md bg-white flex flex-col items-center ${
                plan.isPopular ? 'border-black shadow-lg scale-105' : 'border-gray-200'
              } transition-transform duration-300`}
            >
              {plan.isPopular && (
                <span className="text-sm uppercase text-white bg-black px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>

              <ul className="mb-6 space-y-3 text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full px-6 py-3 text-white bg-black hover:bg-gray-800 rounded-lg transition">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        © 2025 Lovable. All rights reserved.
      </footer>
    </div>
  )
}

export default Prompt