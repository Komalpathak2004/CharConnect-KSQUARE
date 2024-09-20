import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { ChevronLeftIcon } from "@heroicons/react/24/solid"; // Import Heroicons back arrow

const SpecialHeader = () => {
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
      navigate("/donor");
      closeModal();
    }
  };

  const handleFormSubmit = () => {
    console.log("Account Type:", accountType);
    console.log("Private Key:", privateKey);
    console.log("Additional Info:", additionalInfo);

    navigate("/home1");
    closeModal();
  };

  const handleRemoveAccountClick = () => {
    openConfirmationModal();
  };

  const handleConfirmationSubmit = () => {
    if (confirmationInput.toLowerCase() === "remove my account") {
      navigate("/"); // Redirect to Home page or any other specified route
    } else {
      alert("Please type 'Remove my account' to confirm.");
    }
    closeConfirmationModal();
  };

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1); // Using navigate(-1) to go back to the previous page
  };

  return (
    <>
      <header className="bg-blue-800 text-white px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CharityConnect Logo" className="h-12 w-12" />
          <span className="font-semibold text-lg text-brown-500">CharConnect</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <button
            className="text-white hover:text-gray-300 transition-colors duration-300"
            onClick={goBack}
            aria-label="Go back" // Accessibility label
          >
            <ChevronLeftIcon className="h-6 w-6" /> {/* Icon for the back button */}
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

export default SpecialHeader;
