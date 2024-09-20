import React, { useState, useEffect } from "react";
import { getContract } from "../contract";
import { ethers } from "ethers";
import Modal from "react-modal";
import Lottie from "react-lottie";
import animation6Data from "../animation/animation6.json"; // Import your animation JSON

// Set up the app element for React Modal accessibility
Modal.setAppElement("#root");

function BillPage() {
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(null); // To manage which row is being uploaded
  const [status, setStatus] = useState({}); // To track status of each withdrawal
  const [selectedFile, setSelectedFile] = useState(null); // To manage file uploads
  const [isFileUploaded, setIsFileUploaded] = useState({}); // To track upload status of each file

  // Modal state
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [uploadIndex, setUploadIndex] = useState(null); // Index of the row being uploaded
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadWithdrawalHistory();
  }, []);

  const loadWithdrawalHistory = async () => {
    try {
      const contract = getContract();
      const withdrawals = await contract.getWithdrawalHistory();
      setWithdrawalHistory(withdrawals);
      // Initialize status as 'Pending' for all withdrawals
      setStatus(
        withdrawals.reduce((acc, _, index) => {
          acc[index] = "Pending";
          return acc;
        }, {})
      );

      // Load uploaded files status from localStorage
      const fileUploadStatus = {};
      withdrawals.forEach((_, index) => {
        if (localStorage.getItem(`uploadedBill_${index}`)) {
          fileUploadStatus[index] = true;
          setStatus((prevStatus) => ({
            ...prevStatus,
            [index]: "Confirmed",
          }));
        }
      });
      setIsFileUploaded(fileUploadStatus);
    } catch (err) {
      console.error("Error loading withdrawal history:", err);
      setError(
        "Failed to load withdrawal history. Check console for details."
      );
    }
  };

  const openTypeModal = (index) => {
    setUploadIndex(index);
    setIsTypeModalOpen(true);
  };

  const closeTypeModal = () => {
    setIsTypeModalOpen(false);
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (uploadIndex === null) return;
  
    if (password === "ngo1234") {
      if (!selectedFile) {
        alert("No file selected.");
        return;
      }
  
      // Read file and store it in local storage as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        const fileDataUrl = reader.result;
        localStorage.setItem(`uploadedBill_${uploadIndex}`, fileDataUrl);
  
        // Show animation for 3 seconds
        setUploading(uploadIndex);
  
        // Simulate a file upload delay with animation
        setTimeout(() => {
          // Update status to "Confirmed"
          setStatus((prevStatus) => ({
            ...prevStatus,
            [uploadIndex]: "Confirmed",
          }));
          setIsFileUploaded((prevState) => ({
            ...prevState,
            [uploadIndex]: true,
          }));
          setUploading(null); // Stop the animation
          setPassword("");
          setIsPasswordModalOpen(false);
        }, 3000); // 3 seconds delay for animation
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Incorrect password.");
    }
  };
  

  const handleTypeSelection = (type) => {
    if (type === "Donor") {
      alert("Not allowed to upload the bill.");
      setUploadIndex(null);
      setIsTypeModalOpen(false);
    } else if (type === "NGO") {
      setIsTypeModalOpen(false);
      openPasswordModal();
    }
  };

  const modalStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "500px",
      width: "90%",
      background: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      outline: "none",
    },
    overlay: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  // Function to open uploaded file
  const handleOpenFile = (index) => {
    const fileUrl = localStorage.getItem(`uploadedBill_${index}`);
    if (fileUrl) {
      const newWindow = window.open();
      newWindow.document.write(`<iframe src="${fileUrl}" width="100%" height="100%"></iframe>`);
    }
  };

  return (
    <div className="bill-page p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <header className="bg-blue-900 text-white p-4 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold">Bill History</h1>
        <p className="mt-2 text-lg text-red-400 font-semibold">
          Note: Once the bill is uploaded, it cannot be changed.
        </p>
      </header>

      <section className="my-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">
                  Amount (ETH)
                </th>
                <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">
                  Description
                </th>
                <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">
                  Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">
                  Upload Bill
                </th>
                <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">
                  View Bill
                </th>
              </tr>
            </thead>
            <tbody>
              {withdrawalHistory.length ? (
                withdrawalHistory.map((tx, index) => {
                  const amount = tx?.amount || "0";
                  const description = tx?.description || "N/A";
                  const name = tx?.name || "N/A";
                  const timestamp = tx?.timestamp
                    ? new Date(tx.timestamp * 1000).toLocaleString()
                    : "N/A";
                  const rowStatus = status[index] || "Pending";
                  const isUploaded = isFileUploaded[index] || false;

                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-transform duration-300 ease-in-out"
                    >
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {ethers.utils.formatEther(amount)} ETH
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {description}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {timestamp}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {rowStatus}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          disabled={isUploaded} // Disable file input if uploaded
                          className="mb-2 px-4 py-2 rounded-md border border-gray-300"
                        />
                        <button
                          onClick={() => openTypeModal(index)}
                          disabled={isUploaded} // Disable button if uploaded
                          className={`px-4 py-2 rounded-md font-semibold ${
                            isUploaded
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                          }`}
                        >
                          {isUploaded ? "Uploaded" : "Upload"}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {isUploaded && (
                          <button
                            onClick={() => handleOpenFile(index)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No withdrawal history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-4 text-center">{error}</p>
      )}

      {/* Type Selection Modal */}
      <Modal
  isOpen={isTypeModalOpen}
  onRequestClose={closeTypeModal}
  style={modalStyles}
>
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4 mt-2 text-gray-800">
      Choose Your Role
    </h2>
    <p className="text-gray-600 mb-3">
      Please select whether you are a <strong>Donor</strong> or an <strong>NGO</strong> to proceed with the bill upload process. 
    </p>
    <p className="text-red-600 font-medium mb-4">
      Note: Ensure that you have the necessary permissions for your selected role.
    </p>
    <div className="flex justify-center gap-6 mt-6">
      <button
        onClick={() => handleTypeSelection("Donor")}
        className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-200 transform hover:scale-105"
      >
        Donor
      </button>
      <button
        onClick={() => handleTypeSelection("NGO")}
        className="px-5 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-transform duration-200 transform hover:scale-105"
      >
        NGO
      </button>
    </div>
    <div className="mt-8 text-sm text-gray-500 text-center">
      <p>
        By selecting your role, you agree to our{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Privacy Policy
        </a>.
      </p>
    </div>
  </div>
</Modal>

      {/* Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onRequestClose={closePasswordModal}
        style={modalStyles}
      >
        <h2 className="text-xl font-semibold mb-4">Enter NGO Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleUpload}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Confirm Upload
        </button>
      </Modal>

      {/* Upload Animation */}
      {uploading !== null && (
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: animation6Data,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={200}
          width={200}
        />
      )}
    </div>
  );
}

export default BillPage;
