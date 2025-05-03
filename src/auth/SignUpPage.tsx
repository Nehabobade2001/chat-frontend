import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-[#0D0D0D] flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 mr-2"></div>
            <h1 className="text-white text-2xl font-semibold">lovable</h1>
          </div>

          <h2 className="text-white text-2xl font-bold mb-2">Create your account</h2>
          <p className="text-sm text-gray-400 mb-4">
            Already have an account? <a className="underline" href="#">Sign in</a>
          </p>

          <button className="w-full flex items-center justify-center gap-2 bg-[#1F1F1F] text-white py-2 px-4 rounded mb-3 border border-gray-700 hover:bg-gray-800">
            <i className="fab fa-github"></i> Sign up with GitHub
          </button>

          <button className="w-full flex items-center justify-center gap-2 bg-[#1F1F1F] text-white py-2 px-4 rounded mb-3 border border-gray-700 hover:bg-gray-800">
            <i className="fab fa-google"></i> Sign up with Google <span className="text-xs text-gray-400 ml-auto">Last used</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          <form>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-transparent border border-gray-700 text-white py-2 px-4 rounded mb-3 placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border border-gray-700 text-white py-2 px-4 rounded mb-3 placeholder-gray-500"
            />
            <div className="flex items-start text-sm text-gray-400 mb-4">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span>
                Agree to our <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>
              </span>
            </div>
            <button type="submit" className="w-full bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-100">
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#1F1F1F] via-[#2D2D2D] to-[#121212] items-center justify-center text-center p-10">
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">Your superhuman full stack engineer.</h2>
          <p className="text-gray-400 mb-10">You ask, Lovable builds d</p>
          <p className="text-xs text-gray-500">Made with love in Stockholm.</p>
        </div>
      </div>
    </div>
  );
}
