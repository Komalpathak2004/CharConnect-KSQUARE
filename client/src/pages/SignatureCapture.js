import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import Lottie from "react-lottie";
import animationData from "../animation/animation6.json"; // Your animation JSON

const SignatureCapture = ({ onVerify }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [buttonText, setButtonText] = useState("Verify");
  const signaturePadRef = useRef();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isDisabled) {
      setIsDisabled(false);
      setShowAnimation(true);
      setButtonText("Verifying Signature");
    }
    return () => clearInterval(interval);
  }, [timer, isDisabled]);

  const handleAnimationComplete = () => {
    setButtonText("Verified");
    setTimeout(() => {
      setShowAnimation(false);
      onVerify(true);
    }, 3000);
  };

  const handleSignature = () => {
    setButtonText("Verifying Signature");
    setIsDisabled(true);
    setTimer(3);
  };

  const handleClear = () => {
    signaturePadRef.current.clear();
  };

  // CSS Styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to bottom right, #f8f9fa, #e9ecef)", // Professional gradient background
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
    maxWidth: "600px",
    margin: "20px auto",
    position: "relative",
    overflow: "hidden",
    border: "1px solid #e0e0e0",
  };
  

  const canvasContainerStyle = {
    border: "2px solid #007bff",
    borderRadius: "15px",
    background: "linear-gradient(to bottom right, #f0f4f8, #ffffff)", // Light gradient
    padding: "10px", // Padding around the canvas to show gradient
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  };

  const canvasStyle = {
    borderRadius: "10px",
  };

  const buttonStyle = {
    padding: "14px 28px",
    backgroundColor: isDisabled ? "#6c757d" : "#007bff",
    color: "#ffffff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    marginTop: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    outline: "none",
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  };

  const timerStyle = {
    color: "#007bff",
    fontSize: "16px",
    marginTop: "15px",
    fontWeight: "bold",
  };

  const overlayStyle = {
    display: showAnimation ? "flex" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(5px)",
    zIndex: 1000,
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#333", marginBottom: "60px", fontSize: "24px", fontWeight: "600" }}>Signature Capture</h2>
      <div style={canvasContainerStyle}>
        <SignatureCanvas
          ref={signaturePadRef}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
          }}
          style={canvasStyle}
          disabled={isDisabled}
        />
      </div>
      <div style={buttonContainerStyle}>
        <button
          onClick={handleSignature}
          style={buttonStyle}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
        <button
          onClick={handleClear}
          style={buttonStyle}
          disabled={isDisabled}
        >
          Clear
        </button>
      </div>
      {timer > 0 && (
        <div style={timerStyle}>
          Please wait {timer} seconds before signing again.
        </div>
      )}
      {showAnimation && (
        <div style={overlayStyle}>
          <Lottie 
            options={{ animationData, loop: false }} 
            height={200} 
            width={500} 
            eventListeners={[
              {
                eventName: 'complete',
                callback: handleAnimationComplete,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default SignatureCapture;
