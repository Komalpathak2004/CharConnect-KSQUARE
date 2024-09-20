import React from 'react';
import impactImage from '../images/img7bg.png'; // Adjust the path if needed

function Impact() {
  return (
    <section className="impact py-10 px-3 relative flex flex-col md:flex-row items-center">
      <div className="relative z-10 flex flex-col md:flex-row items-center max-w-6xl mx-auto">
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2 mb-12 md:mb-0">
          {/* Impact Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 md:mb-8 mx-4 md:mx-10 text-[#496A81]">Impact</h2>
            <p className="text-base md:text-lg mb-6 text-gray-700 font-medium mx-4 md:mx-10">
              CharConnect provides real-time reporting on the impact of your donations. Our platform offers insights into how donations are utilized, tracking funds to various projects and initiatives. You can see how your contributions are making an impact, from providing resources to underserved communities to funding programs that drive change.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full transition duration-300 ease-in-out shadow-md mx-4 md:mx-10 my-3">
              Learn More
            </button>
          </div>
        </div>

        {/* Static Image */}
        <div className="md:w-1/2 mb-12 md:mb-0 flex justify-center">
          <img
            src={impactImage}
            alt="Impact"
            className="w-full max-w-sm md:max-w-xs h-auto" // Responsive size
          />
        </div>
      </div>
    </section>
  );
}

export default Impact;
