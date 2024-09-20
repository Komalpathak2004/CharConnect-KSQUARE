
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";

const Home2Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const [privateKey, setPrivateKey] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [confirmationInput, setConfirmationInput] = useState("");
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAccountType(null);
    setPrivateKey("");
    setAdditionalInfo("");
  };

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
    setConfirmationInput("");
  };

  const handleAccountTypeClick = (type) => {
    setAccountType(type);
    if (type === "Donor") {
      navigate('/donor');
      closeModal();
    }
  };

  const handleFormSubmit = () => {
    console.log("Account Type:", accountType);
    console.log("Private Key:", privateKey);
    console.log("Additional Info:", additionalInfo);

    navigate('/home2');
    closeModal();
  };

  const handleRemoveAccountClick = () => {
    openConfirmationModal();
  };

  const handleConfirmationSubmit = () => {
    if (confirmationInput.toLowerCase() === "remove my account") {
      navigate('/'); // Redirect to Home page or any other specified route
    } else {
      alert("Please type 'Remove my account' to confirm.");
    }
    closeConfirmationModal();
  };

  return (
    <>
      <header className="bg-blue-800 text-white px-4 lg:px-6 h-16 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="CharityConnect Logo"
            className="h-12 w-12"
          />
          <span className="font-semibold text-lg text-brown-500">
            CharConnect
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            to="/ngo"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400"
          >
            NGOs
          </Link>
          <Link
            to="/transactions"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400"
          >
            Transactions
          </Link>
          <Link
            to="/donations-bar-graph"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400"
          >
          Statistical Data
          </Link>
          <Link
            to="/home2"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400"
          >
            Dashboard
          </Link>
          <Link
            to="/billpage"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-300 hover:text-yellow-400"
          >
            Bill
          </Link>
          <button
            className="text-sm font-medium bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600"
            onClick={handleRemoveAccountClick}
          >
            Remove Account
          </button>
        </nav>
      </header>

      {/* Confirmation Modal */}
      {confirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Are you sure you want to remove your account?
            </h2>
            <p className="text-sm mb-4 text-gray-600">
              Type "Remove my account" to confirm.
            </p>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded w-full mb-4"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              placeholder="Type here"
            />
            <div className="flex justify-between">
              <button
                className="text-base font-medium bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                onClick={handleConfirmationSubmit}
              >
                Confirm
              </button>
              <button
                className="text-base font-medium bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
                onClick={closeConfirmationModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home2Header;
