// src/components/DonationForm.js
import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract, provider } from "../contract";

const DonationForm = ({ onDonationSuccess }) => {
  const [amountToDonate, setAmountToDonate] = useState("");
  const [donationDescription, setDonationDescription] = useState("");
  const [donationName, setDonationName] = useState("");
  const [error, setError] = useState("");

  const handleDonate = async () => {
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

      // Notify parent component of successful donation
      if (onDonationSuccess) {
        onDonationSuccess();
      }
    } catch (error) {
      console.error("Error during donation:", error);
      setError("Failed to donate. Check console for details.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amountToDonate}
        onChange={(e) => setAmountToDonate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={donationDescription}
        onChange={(e) => setDonationDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={donationName}
        onChange={(e) => setDonationName(e.target.value)}
      />
      <button onClick={handleDonate}>Donate</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default DonationForm;
