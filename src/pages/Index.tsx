
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GRADIENT_BG =
  "bg-gradient-to-br from-[#D3E4FD] via-[#E5DEFF] to-[#9b87f5]";

const Index = () => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${GRADIENT_BG} relative overflow-hidden`}
    >
      {/* Subtle animated shape background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full block"
          preserveAspectRatio="none"
          viewBox="0 0 1440 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="blobGradient" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.27" />
              <stop offset="100%" stopColor="#33C3F0" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <ellipse
            cx="720"
            cy="270"
            rx="830"
            ry="310"
            fill="url(#blobGradient)"
            className="animate-pulse duration-[6500ms]"
          />
        </svg>
      </div>

      <main className="relative z-10 w-full max-w-lg">
        <div className="bg-white/90 rounded-2xl shadow-xl px-8 py-12 backdrop-blur-md flex flex-col items-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#8B5CF6] via-[#33C3F0] to-[#D946EF] bg-clip-text text-transparent drop-shadow">
            Welcome to <span className="text-gradient-primary">Lovable React</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-md text-center">
            Build modern, professional web apps <span className="font-medium text-primary">fast</span> with React, Tailwind CSS, and shadcn/ui. Get started with beautiful UI building blocks designed for real products.
          </p>
          <Link
            className="hover-scale px-8 py-3 font-bold text-lg bg-gradient-to-r from-primary to-[#7E69AB] text-white shadow-lg border-0"
            to="/aboute"
          >
            Get Started
          </Link>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Lovable React Starter. Crafted with <span className="text-pink-400 font-bold">&hearts;</span>
        </div>
      </main>
    </div>
  );
};

export default Index;
