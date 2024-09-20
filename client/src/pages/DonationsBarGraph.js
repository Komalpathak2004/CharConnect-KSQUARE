import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ethers } from "ethers";
import { getContract } from "../contract";
import Lottie from "react-lottie";
import animationData from "../animation/animation4.json"; // Ensure you have this animation file

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonationsBarGraph = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contract = getContract();
        const withdrawals = await contract.getWithdrawalHistory();
        const donations = await contract.getDonationHistory();

        // Combine donations and withdrawals into a single array
        const combinedData = [
          ...donations.map((entry) => ({ ...entry, type: "donation" })),
          ...withdrawals.map((entry) => ({ ...entry, type: "withdrawal" })),
        ];

        // Sort combined data by timestamp
        combinedData.sort((a, b) => a.timestamp - b.timestamp);

        // Process data for chart
        const labels = [];
        const withdrawalData = [];
        const donationData = [];

        // Create a map for labels and data
        const dataMap = {};

        combinedData.forEach((entry) => {
          const date = new Date(entry.timestamp * 1000).toLocaleString();
          if (!dataMap[date]) {
            dataMap[date] = { withdrawal: 0, donation: 0 };
          }

          if (entry.type === "donation") {
            dataMap[date].donation += parseFloat(ethers.utils.formatEther(entry.amount));
          } else if (entry.type === "withdrawal") {
            dataMap[date].withdrawal += parseFloat(ethers.utils.formatEther(entry.amount));
          }
        });

        // Extract labels and datasets
        Object.keys(dataMap).forEach((date) => {
          labels.push(date);
          withdrawalData.push(dataMap[date].withdrawal);
          donationData.push(dataMap[date].donation);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Donations",
              data: donationData,
              backgroundColor: "rgba(75, 192, 192, 0.4)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              barPercentage: 1.8, // Adjust bar width
              categoryPercentage: 0.7, // Adjust space between categories
            },
            {
              label: "Withdrawals",
              data: withdrawalData,
              backgroundColor: "rgba(255, 99, 132, 0.4)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              barPercentage: 1.8, // Adjust bar width
              categoryPercentage: 0.7, // Adjust space between categories
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Check console for details.");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      x: {
        ticks: {
          display: false, // Hide x-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light grid lines for x-axis
        },
      },
      y: {
        beginAtZero: true,
        min: 0, // Set the minimum value for the y-axis
        max: 2, // Set the maximum value for the y-axis
        ticks: {
          color: "#fff", // Change y-axis label color to white
          callback: function (value) {
            return value + " ETH"; // Add ETH to the y-axis labels
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light grid lines for y-axis
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff", // Change legend labels color to white
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + " ETH"; // Add ETH to tooltips
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <Lottie
            options={{ loop: true, autoplay: true, animationData }}
            height={150}
            width={150}
          />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full max-w-5xl p-3 bg-green-400 shadow-md rounded-lg">
          {/* Lottie Animation Component */}
          <div className="lg:w-1/2 flex items-center justify-center p-4">
            <div className="w-full h-full flex items-center justify-center">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true, // Start animation automatically
                  animationData: animationData,
                }}
                width={400} // Increase width as needed
                height={400} // Increase height as needed
              />
            </div>
          </div>

          {/* Chart Component */}
          <div className="lg:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              Donation and Withdrawal History
            </h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="w-full">
              <Bar
                data={chartData}
                options={options}
                width={800} // Set chart width
                height={400} // Set chart height
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsBarGraph;
