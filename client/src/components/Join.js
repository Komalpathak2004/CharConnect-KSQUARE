import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animation/animation3.json'; // Adjust the path if needed

function Join() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <section
      className="join py-10 px-6 md:px-10"
      style={{
        background: 'linear-gradient(to right, rgba(179, 175, 143, 0.8), rgba(102, 153, 155, 0.8))'
      }}
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Lottie Animation */}
        <div className="flex-shrink-0 mb-8 md:mb-0 md:w-1/2 flex justify-center">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>

        {/* Text Content */}
        <div className="flex-grow text-center md:text-left md:w-1/2 md:ml-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-700">Join the Movement</h2>
          <p className="text-base md:text-lg mb-6">
            Be a part of the CharConnect community and help us transform lives through your donations.
          </p>
          <form className="mx-50 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-2 mb-6 border border-gray-300 rounded"
            />
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-full transition duration-300 hover:bg-yellow-600 flex justify-center">Sign Up</button>
            <p className="mt-2 text-sm">Terms & Conditions</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Join;
