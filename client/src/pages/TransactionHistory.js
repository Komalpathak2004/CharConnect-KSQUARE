import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../contract";
import Lottie from "react-lottie";
import initialAnimationData from "../animation/animation1.json"; // Import your initial animation JSON

function TransactionHistory() {
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const [filteredWithdrawalHistory, setFilteredWithdrawalHistory] = useState([]);
  const [filteredDonationHistory, setFilteredDonationHistory] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate initial loading animation display
    const timer = setTimeout(() => setLoading(false), 3000); // Show initial animation for 3 seconds

    loadBlockchainData();

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const loadBlockchainData = async () => {
    try {
      const contract = getContract();
      const withdrawals = await contract.getWithdrawalHistory();
      const donations = await contract.getDonationHistory();

      setWithdrawalHistory(withdrawals);
      setDonationHistory(donations);
      setFilteredWithdrawalHistory(withdrawals);
      setFilteredDonationHistory(donations);
    } catch (err) {
      console.error("Error loading blockchain data:", err);
      setError("Failed to load blockchain data. Check console for details.");
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filterTransactions = (transactions) =>
      transactions.filter(
        (tx) =>
          ethers.utils.formatEther(tx.amount).includes(query) ||
          tx.description.toLowerCase().includes(query) ||
          new Date(tx.timestamp * 1000).toLocaleString().toLowerCase().includes(query)
      );

    setFilteredWithdrawalHistory(filterTransactions(withdrawalHistory));
    setFilteredDonationHistory(filterTransactions(donationHistory));
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
    <div className="transaction-history-page p-6 bg-gray-100 min-h-screen">
      {/* Initial Loading Animation */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <Lottie options={initialLoadingOptions} height={200} width={200} />
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 flex justify-between items-center shadow-md rounded-t-md">
            <h1 className="text-2xl font-extrabold tracking-tight">Transaction History</h1>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-950 sm:text-sm"
            />
          </header>

          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

          <section className="my-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 border-b-2 border-blue-500 pb-2">
              Donation History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
                <thead className="bg-gradient-to-r from-blue-100 to-teal-100">
                  <tr>
                    <th className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">SN</th>
                    <th className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">Amount</th>
                    <th className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">Description</th>
                    <th className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonationHistory.map((tx, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-300 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors duration-300`}
                    >
                      <td className="px-4 py-2 text-sm">{index + 1}</td>
                      <td className="px-4 py-2 text-sm">{ethers.utils.formatEther(tx.amount)} ETH</td>
                      <td className="px-4 py-2 text-sm">{tx.description}</td>
                      <td className="px-4 py-2 text-sm">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="my-6">
            <h2 className="text-xl font-semibold mb-4 text-teal-800 border-b-2 border-teal-500 pb-2">
              Withdrawal History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
                <thead className="bg-gradient-to-r from-teal-100 to-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">SN</th>
                    <th className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">Amount</th>
                    <th className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">Description</th>
                    <th className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-300">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWithdrawalHistory.map((tx, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-300 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors duration-300`}
                    >
                      <td className="px-4 py-2 text-sm">{index + 1}</td>
                      <td className="px-4 py-2 text-sm">{ethers.utils.formatEther(tx.amount)} ETH</td>
                      <td className="px-4 py-2 text-sm">{tx.description}</td>
                      <td className="px-4 py-2 text-sm">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default TransactionHistory;
