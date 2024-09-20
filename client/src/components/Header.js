import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import animationData from '../animation/animation2.json'; // Adjust the path to your Lottie JSON file
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // For eye icons
import jsQR from "jsqr"; // Import jsqr
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const [password, setPassword] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);
  const [decodedPrivateKey, setDecodedPrivateKey] = useState(""); // State for the decoded private key
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAccountType(null);
    setPassword("");
    setDecodedPrivateKey(""); // Reset the decoded private key when closing modal
  };

  const handleQRImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const decoded = jsQR(imageData.data, canvas.width, canvas.height);
          if (decoded) {
            setDecodedPrivateKey(decoded.data); // Set the decoded private key
            toast.success('QR code successfully decoded!');
          } else {
            toast.error('Failed to decode QR code.');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    const validPrivateKey = "0x30409b9dcc970f8b0d6b8af65306109294eaeed244bb7748525bd94fc7793781";
    const donorPassword = "donor1234";
    const ngoPassword = "ngo1234";

    // Check if a valid private key was decoded
    if (decodedPrivateKey !== validPrivateKey) {
      toast.error('Invalid private key!');
      return;
    }

    if (accountType === "Donor" && password !== donorPassword) {
      toast.error('Invalid password for Donor account!');
      return;
    }

    if (accountType === "NGO" && password !== ngoPassword) {
      toast.error('Invalid password for NGO account!');
      return;
    }

    toast.success(`${accountType} account added successfully!`);

    setShowAnimation(true);
    setTimeout(() => {
      if (accountType === "Donor") {
        navigate('/home1');
      } else if (accountType === "NGO") {
        navigate('/home2');
      }
      setShowAnimation(false);
    }, 2000);

    closeModal();
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <header className="bg-blue-800 text-white px-4 lg:px-6 h-16 flex items-center">
        <a className="flex items-center gap-2" href="#">
          <img src={logo} alt="CharityConnect Logo" className="h-12 w-12" />
          <span className="font-semibold text-lg text-brown-500">CharConnect</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <a className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400" href="/payment">Payment</a>
          <a className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400" href="/about">About</a>
          <a className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400" href="/">Home</a>
          <button className="text-sm font-medium bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600" onClick={openModal}>Add Account</button>
        </nav>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg p-6 w-full max-w-md md:max-w-lg mx-auto">
            {accountType === null ? (
              <>
                <h2 className="text-3xl font-semibold mb-1 mt-8 text-gray-800">Choose Account Type</h2>
                <h3 className="text-xs font-normal mb-5 text-gray-600">Select the type of account that best suits your needs.</h3>
                <div className="flex flex-col gap-4">
                  <div className="border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-100" onClick={() => setAccountType("NGO")}>
                    <div className="text-xl font-medium text-gray-700">NGO</div>
                    <p className="text-gray-600 mt-2">Register as a non-governmental organization.</p>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-green-100" onClick={() => setAccountType("Donor")}>
                    <div className="text-xl font-medium text-gray-700">Donor</div>
                    <p className="text-gray-600 mt-2">Sign up to support our causes.</p>
                  </div>
                </div>
                <button className="mt-8 text-sm text-gray-500 hover:text-gray-700" onClick={closeModal}>Cancel</button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">{accountType} Account Setup</h2>
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-medium text-gray-700 w-full">Upload QR Code
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-1 p-3 border border-gray-300 rounded w-full"
                      onChange={handleQRImageUpload}
                    />
                  </label>
                  <label className="text-sm font-medium text-gray-700 w-full">Decoded Private Key
                    <div className="relative">
                      <input
                        type={isPrivateKeyVisible ? "text" : "password"}
                        className="mt-1 p-3 mx-0 border border-gray-300 rounded w-full"
                        value={decodedPrivateKey}
                        placeholder="Private Key will appear here after scanning QR"
                        readOnly
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setIsPrivateKeyVisible(!isPrivateKeyVisible)}
                      >
                        {isPrivateKeyVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </label>
                  <label className="text-sm font-medium text-gray-700 w-full">Password
                    <input
                      type="password"
                      className="mt-1 p-3 border border-gray-300 rounded w-full"
                      value={password}
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-center">
                    <button className="text-base font-medium bg-blue-500 text-white py-2 w-32 hover:bg-blue-800 rounded-full" onClick={handleFormSubmit}>Submit</button>
                  </div>
                </div>
                <button className="mt-4 text-sm text-gray-500 hover:text-gray-700" onClick={() => setAccountType(null)}>Back</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Animation overlay */}
      {showAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Header;
