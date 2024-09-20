import React from 'react';
import img4 from '../images/img4.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';

function Mission() {
  return (
    <section className="mission bg-gray-100 py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-[#496A81]">Our Mission</h2>
        <p className="text-lg mb-8 text-gray-700">
          CharConnect is dedicated to building trust and engagement between donors and NGOs. We provide real-time transparency and accountability, empowering you to make informed decisions and maximize the impact of your generosity.
        </p>
        <div className="flex justify-center gap-4">
          <img
            src={img2}
            alt="Mission 1"
            className="rounded-lg shadow-md w-1/4 h-auto"
          />
          <img
            src={img3}
            alt="Mission 2"
            className="rounded-lg shadow-md w-1/4 h-auto"
          />
          <img
            src={img4}
            alt="Mission 3"
            className="rounded-lg shadow-md w-1/4 h-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default Mission;
