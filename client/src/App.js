import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home1Header from "./components/Home1Header";
import Home2Header from "./components/Home2Header";
import Header from "./components/Header";
import HeaderDashboard from "./components/HeaderDashboard";
import SpecialHeader from "./components/SpecialHeader";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Impact from "./components/Impact";
import Join from "./components/Join";
import Footer from "./components/Footer";
import Donor from "./pages/Donate";
import NGO from "./pages/Withdraw";
import Home1 from "./pages/Home1";
import Home2 from "./pages/Home2";
import "./index.css";
import { ToastContainer } from "react-toastify";
import TransactionHistory from "./pages/TransactionHistory";
import DonationsBarGraph from "./pages/DonationsBarGraph";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import BillPage from "./pages/BillPage";
import Payment from "./pages/Payment";

const App = () => {
  const location = useLocation();

  // Determine which header to display based on the current route
  const isHomeOrDonorPage = location.pathname === "/home1" || location.pathname === "/donor";
  const isNGOPage = location.pathname === "/home2" || location.pathname === "/ngo" || location.pathname === "/billpage";
  const isDashboardPage = location.pathname === "/dashboard";
  const isTransactionsPage = location.pathname === "/transactions";
  const isDonationsBarGraphPage = location.pathname === "/donations-bar-graph";
  const isBillPage = location.pathname === "/billpage";
  const noHeaderPages = isTransactionsPage || isDonationsBarGraphPage;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Show SpecialHeader on specific pages */}
      {isTransactionsPage || isDonationsBarGraphPage || isBillPage ? (
        <SpecialHeader
          title={isTransactionsPage ? "Transaction History" : isDonationsBarGraphPage ? "Donations Bar Graph" : "Bill Page"}
          searchQuery={""} // Pass searchQuery if needed
          onSearchChange={() => {}} // Pass a handler if needed
        />
      ) : isDashboardPage ? (
        <HeaderDashboard />
      ) : isNGOPage ? (
        <Home2Header />
      ) : isHomeOrDonorPage ? (
        <Home1Header />
      ) : (
        <Header />
      )}

      {/* Render common sections only if on the root route */}
      {location.pathname === "/" && (
        <>
          <Hero />
          <Mission />
          <Impact />
          <Join />
        </>
      )}

      <Routes>
        <Route path="/home1" element={<Home1 />} /> {/* Default Home or Welcome Page */}
        <Route path="/home2" element={<Home2 />} /> {/* NGO Home */}
        <Route path="/donor" element={<Donor />} />
        <Route path="/ngo" element={<NGO />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/donations-bar-graph" element={<DonationsBarGraph />} />
        <Route path="/about" element={<About />} /> {/* About page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/billpage" element={<BillPage />} /> {/* BillPage */}
        <Route path="/payment" element={<Payment />} /> 
        {/* Add other routes here */}
      </Routes>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
