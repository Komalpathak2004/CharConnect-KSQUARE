import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract, provider } from "../contract";
import Lottie from "react-lottie";
import initialAnimationData from "../animation/animation2.json"; // Import your initial animation JSON
import SignatureCapture from "./SignatureCapture"; // Import your SignatureCapture component
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function Donate() {
  const [amountToDonate, setAmountToDonate] = useState("");
  const [donationDescription, setDonationDescription] = useState("");
  const [donationName, setDonationName] = useState("");
  const [donationHistory, setDonationHistory] = useState([]);
  const [balance, setBalance] = useState("0");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading
  const [signatureVerified, setSignatureVerified] = useState(false); // State to manage signature verification
  const [timerExpired, setTimerExpired] = useState(false); // State to track if the timer has expired
  const [timeLeft, setTimeLeft] = useState(90); // State to track remaining time in seconds

  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Simulate initial loading animation display
    const timer = setTimeout(() => setLoading(false), 3000); // Show initial animation for 3 seconds

    loadBlockchainData();

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    let timer;
    if (signatureVerified && !timerExpired) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // Decrease time left by 1 every second
      }, 1000);

      // Set timer expired if time left reaches 0
      if (timeLeft <= 0) {
        setTimerExpired(true);
        clearInterval(timer);
      }
    }

    return () => clearInterval(timer); // Cleanup interval on unmount or if conditions change
  }, [signatureVerified, timeLeft, timerExpired]);

  useEffect(() => {
    // Redirect to /home2 when the timer expires
    if (timerExpired) {
      const redirectTimer = setTimeout(() => {
        navigate("/home2"); // Redirect to the /home2 page
      }, 2000); // Redirect after 2 seconds

      return () => clearTimeout(redirectTimer); // Cleanup redirect timer on unmount
    }
  }, [timerExpired, navigate]);

  const loadBlockchainData = async () => {
    try {
      const contract = getContract();
      const donations = await contract.getDonationHistory();
      const contractBalance = await contract.getBalance();

      setDonationHistory(donations);
      setBalance(ethers.utils.formatEther(contractBalance));
    } catch (err) {
      console.error("Error loading blockchain data:", err);
      setError("Failed to load blockchain data. Check console for details.");
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!signatureVerified) {
      setError("Please verify your signature first.");
      return;
    }
    const contract = getContract();
    const signer = provider.getSigner();

    try {
      const tx = await contract.connect(signer).donate(
        donationDescription,
        donationName,
        { value: ethers.utils.parseEther(amountToDonate) }
      );
      await tx.wait();
      alert("Donation successful!");

      // Reset the donation form fields
      setAmountToDonate("");
      setDonationDescription("");
      setDonationName("");

      loadBlockchainData(); // Reload the blockchain data to update balance
    } catch (error) {
      console.error("Error during donation:", error);
      setError("Failed to donate. Check console for details.");
    }
  };

  // Lottie animation options for initial loading animation
  const initialLoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: initialAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="donate-page p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen transition-transform duration-300 ease-in-out">
      {/* Initial Loading Animation */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <Lottie options={initialLoadingOptions} height={200} width={200} />
        </div>
      )}

      {/* Signature Verification */}
      {!loading && !signatureVerified && (
        <div className="flex items-center justify-center min-h-screen">
          <SignatureCapture
            onVerify={(verified) => setSignatureVerified(verified)}
          />
        </div>
      )}

      {/* Timer Expired Message */}
      {!loading && signatureVerified && timerExpired && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <p className="text-white text-xl">Session Expired. Redirecting...</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && signatureVerified && !timerExpired && (
        <>
          <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold animate-pulse">Donation Dashboard</h1>
            <div className="text-lg bg-white text-gray-800 p-2 rounded-md shadow-md">
              Time Remaining: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
            </div>
          </header>

          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-600 pb-2">
              Donation History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">Sender</th>
                    <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">Amount (ETH)</th>
                    <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">Description</th>
                    <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">Name</th>
                    <th className="px-4 py-3 text-sm font-semibold border-b border-gray-300">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {donationHistory.map((tx, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-transform duration-300 ease-in-out">
                      <td className="px-4 py-4 text-sm text-gray-700">{tx.sender.slice(0, 6)}...{tx.sender.slice(-4)}</td> {/* Masked Address */}
                      <td className="px-4 py-4 text-sm text-gray-700">{ethers.utils.formatEther(tx.amount)} ETH</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{tx.description}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{tx.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-600 pb-2">Make a New Donation</h2>
            <form className="space-y-6 bg-white p-6 shadow-lg rounded-lg" onSubmit={handleDonate}>
              <label className="block">
                <span className="text-gray-700">Amount (ETH)</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Amount in ETH"
                  value={amountToDonate}
                  onChange={(e) => setAmountToDonate(e.target.value)}
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Description</span>
                <input
                  type="text"
                  placeholder="Donation Description"
                  value={donationDescription}
                  onChange={(e) => setDonationDescription(e.target.value)}
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={donationName}
                  onChange={(e) => setDonationName(e.target.value)}
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-transform duration-300 ease-in-out"
              >
                Donate
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </section>

          {/* Display Contract Balance */}
          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-600 pb-2">Contract Balance</h2>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-lg font-semibold text-gray-800">Current Balance: {balance} ETH</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Donate;
