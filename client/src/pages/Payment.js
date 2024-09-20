import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import 'tailwindcss/tailwind.css';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const paymentOptions = [
    { name: 'Ethereum', image: 'https://image.pngaaa.com/466/1559466-middle.png' },
    { name: 'Bitcoin', image: 'https://th.bing.com/th/id/R.64733f5a35d479112743e534591066b5?rik=ig0kRW3lJbStkg&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fpaomedia%2fsmall-n-flat%2f1024%2fbitcoin-icon.png&ehk=2Euf4lI6eWfuygBcSZSfF6o0eqyUjTNeaWPMwdRdidY%3d&risl=&pid=ImgRaw&r=0' },
    { name: 'Metamask', image: 'https://th.bing.com/th/id/R.d763e374e0694284d371a4e2fb567059?rik=Igurd%2bOSk67MyA&riu=http%3a%2f%2fosync.io%2fimages%2fheaders%2fmetamask.png&ehk=OItJy50Ww3DWbR1teEDOb1mAKqyqJtixS6J3IOIVaGE%3d&risl=&pid=ImgRaw&r=0' },
    { name: 'Binance Coin', image: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Binance-Coin-BNB-icon.png' },
    { name: 'Ripple', image: 'https://th.bing.com/th/id/OIP.Me5IpImeQaXkHxPg2obU1AHaHa?rs=1&pid=ImgDetMain' },
    { name: 'Litecoin', image: 'https://th.bing.com/th/id/OIP.r955sPICN5VraLCL0J7VuQHaHa?rs=1&pid=ImgDetMain' },
  ];

  const handlePaymentSelect = (option) => {
    setSelectedPayment(option.name);
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    setShowQRCode(true);
  };

  return (
    <div className="text-white font-sans bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-cover bg-center">
      {/* Navbar */}

      <div className="container mx-auto px-4 py-16 flex flex-col items-center bg-opacity-75">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Support Our Cause</h1>
          <p className="mt-4 text-lg">Donate securely using blockchain technology</p>
        </header>

        {/* Payment Options Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Payment Options</h3>
          <ul className="flex flex-wrap justify-center gap-4">
            {paymentOptions.map((option) => (
              <li
                key={option.name}
                className={`payment-option bg-blue-600 bg-opacity-75 p-4 rounded-lg shadow-md text-center cursor-pointer transition-all duration-300 ease-in-out ${selectedPayment === option.name ? 'bg-blue-800 border-2 border-white' : ''}`}
                onClick={() => handlePaymentSelect(option)}
              >
                <img src={option.image} alt={option.name} className="w-12 h-12 mx-auto mb-2" />
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button
            onClick={handleDonateClick}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Donate Now
          </button>
        </div>

        {/* QR Code Section */}
        {showQRCode && (
          <div className="flex flex-col items-center justify-center h-96 mt-12 bg-blue-700 bg-opacity-75 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Scan QR Code to Donate</h2>
            <QRCode
              value="https://your-donation-url.com"
              size={192}
              bgColor="#000000"
              fgColor="#ffffff"
              level="H"
              includeMargin={true}
            />
            <p className="text-sm mt-4">Donate with Metamask, Ethereum, Bitcoin, and other cryptocurrencies.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
