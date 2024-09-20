import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animation/animation5.json'; // Update the path to your Lottie JSON file

const About = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
            <div className="flex items-center justify-center">
              <Lottie options={defaultOptions} height={300} width={590} />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-cyan-950">About CharConnect</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  CharConnect is at the forefront of transforming donation management through blockchain technology.
                  We empower donors and NGOs with transparent, efficient, and secure tools to enhance charitable giving
                  and track the impact of every contribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story and Mission Sections */}
   {/* Our Story and Mission Sections */}
<section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-cyan-200 to-blue-300">
  <div className="container mx-auto px-4 md:px-6 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col items-start bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Founded with a vision to enhance the transparency and efficiency of charitable donations, CharityConnect
          began its journey in 2020. With a dedicated team of tech enthusiasts and social impact advocates, we
          have developed innovative solutions that leverage blockchain technology to ensure every donation is
          tracked and utilized effectively. Our growth reflects our commitment to making charitable giving more
          impactful and accountable.
        </p>
      </div>
      <div className="flex flex-col items-start bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our mission is to revolutionize the way donations are managed and utilized by leveraging blockchain
          technology. We aim to provide a platform that ensures transparency, accountability, and efficiency in
          charitable giving, ultimately making the donation process seamless and impactful for both donors and
          NGOs.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Key Values Section */}
<section className="w-full py-16 md:py-24 lg:py-10 -mt-1 bg-gradient-to-r from-cyan-200 to-blue-300">
  <div className="container mx-auto px-3 md:px-7 lg:px-8">
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
      <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-md">
        <div className="bg-blue-500 rounded-full p-4 mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-white"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Innovation</h3>
        <p className="text-gray-600 mt-2">
          We are constantly pushing the boundaries of technology to deliver innovative solutions that enhance
          transparency and efficiency in the donation process.
        </p>
      </div>
      <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-md">
        <div className="bg-green-500 rounded-full p-4 mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-white"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Collaboration</h3>
        <p className="text-gray-600 mt-2">
          We believe in the power of collaboration and work closely with NGOs, donors, and industry partners to
          build effective solutions that create a positive impact.
        </p>
      </div>
      <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-md">
        <div className="bg-purple-500 rounded-full p-4 mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-white"
          >
            <path d="M12 21v-1.5a6 6 0 0 0-6-6H5a6 6 0 0 0-6 6V21"></path>
            <circle cx="7.5" cy="7.5" r="4.5"></circle>
            <path d="M20.24 12.24c-.66.14-1.25.24-1.82.24A6 6 0 0 1 12 6V5a6 6 0 0 1 6-6h.18"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Integrity</h3>
        <p className="text-gray-600 mt-2">
          We uphold the highest standards of integrity, ensuring that all donations are handled with the utmost
          transparency and trustworthiness.
        </p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default About;
