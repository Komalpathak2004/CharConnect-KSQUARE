import React, { useState, useEffect } from "react";
import { Line, PolarArea, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement } from "chart.js";
import Lottie from "react-lottie";
import loadingAnimationData from "../animation/animation1.json"; // Import your loading animation JSON
import '../styles/Dashboard.css'; 
import image from "../images/komal.jpeg"; // Import your image

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true); // State to manage loading

  // Sample data for charts
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#4a85f8",
        tension: 0.1,
      },
    ],
  };

  const polarAreaData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Dataset 1",
        data: [11, 16, 7, 25, 14, 12],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        label: "Dataset 1",
        data: [300, 50, 100, 75],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 3000); // Show initial animation for 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Lottie animation options for loading animation
  const loadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="main">
      {/* Initial Loading Animation */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <Lottie options={loadingAnimationOptions} height={200} width={200} />
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          <div className="sidebar">
            <div className="logo">
              <img src={image} alt="Dashboard" className="logo-image" /> {/* Display imported image */}
              <div className="-ml-28 pl-1 ">Dashboard</div>
            </div>
            <ul className="navigation">
              <li><i className="fa-solid fa-house"></i> Home</li>
              <li><i className="fa-solid fa-boxes-stacked"></i> Donations</li>
              <li><i className="fa-solid fa-user"></i> Donors</li>
              <li><i className="fa-solid fa-chart-simple"></i> Stats</li>
              <li><i className="fa-solid fa-money-bill"></i> Refunds</li>
            </ul>
          </div>
          <div className="main-area">
            <header className="header">
              <div className="intro mt-4">
                <h1>Welcome back, Komal</h1>
              </div>
              <div className="profile">
                <img src={image} alt="profile" /> {/* Use the imported image */}
                <p>Komal</p>
                <p>Home</p>
                <p><i id="light-mode" className="fa-solid fa-sun" style={{ color: "yellow" }} title="Switch To Light Mode"></i></p>
                <p style={{ display: "none" }}><i id="dark-mode" className="fa-solid fa-moon" style={{ color: "darkgray" }} title="Switch To Night Mode"></i></p>
              </div>
            </header>
            <div className="stats">
              <div className="stat box">
                <p><i className="fa-solid fa-dollar-sign"></i> Total Donations</p>
                <h1><i className="fa-solid fa-indian-rupee-sign"></i> 20,50000</h1>
                <p><i className="fa-solid fa-arrow-trend-up" style={{ color: "green" }}></i> 20% More Than Last Month</p>
              </div>
              <div className="stat box">
                <p><i className="fa-solid fa-dollar-sign"></i>Total Funds Raised</p>
                <h1><i className="fa-solid fa-indian-rupee-sign"></i> 10,5000</h1>
                <p><i className="fa-solid fa-arrow-trend-up" style={{ color: "green" }}></i> 10% More Than Last Month</p>
              </div>
              <div className="stat box">
                <p><i className="fa-solid fa-dollar-sign"></i> New Donors</p>
                <h1><i className="fa-solid fa-indian-rupee-sign"></i> 3,010</h1>
                <p><i className="fa-solid fa-arrow-trend-down" style={{ color: "red" }}></i> 50% Less Than Last Month</p>
              </div>
              <div className="stat box">
                <p><i className="fa-solid fa-dollar-sign"></i>Outstanding Donations</p>
                <h1><i className="fa-solid fa-indian-rupee-sign"></i> 30,00000</h1>
                <p><i className="fa-solid fa-arrow-trend-up" style={{ color: "green" }}></i> 10% More Than Last Month</p>
              </div>
            </div>
            <div className="charts">
              <div className="line-chart box">
                <Line data={lineChartData} />
              </div>
              <div className="polar-area box">
                <PolarArea data={polarAreaData} />
              </div>
              <div className="doughnut-chart box">
                <Doughnut data={doughnutData} />
              </div>
            </div>
            <div className="products box">
              <h1>Top Donors This Month</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>Donor Name</th>
                    <th>Amount Donated</th>
                    <th>Amount Withdrawal</th>
                    <th>Donation Date</th>
                    <th>Donation Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td><i className="fa-solid fa-indian-rupee-sign"></i> 23000</td>
                    <td>145000</td>
                    <td>2024-07-29</td>
                    <td>Transfer</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td><i className="fa-solid fa-indian-rupee-sign"></i> 145000</td>
                    <td>23000</td>
                    <td>2024-07-29</td>
                    <td>Withdrawal</td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <td>Michael Brown</td>
                    <td><i className="fa-solid fa-indian-rupee-sign"></i> 75000</td>
                    <td>50000</td>
                    <td>2024-07-29</td>
                    <td>Deposit</td>
                    <td>Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
