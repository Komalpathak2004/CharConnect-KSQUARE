import React from 'react';
import backgroundImage from '../images/pic1.jpg';

function Hero() {
  return (
    <section className="hero bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-24 text-center relative overflow-hidden" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Empowering Donors, Transforming Lives
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto font-normal text-white">
          CharConnect is a donation tracking platform that connects donors with NGOs, providing real-time transparency and accountability for your contributions.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-yellow-500 text-black px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Donate Now
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
