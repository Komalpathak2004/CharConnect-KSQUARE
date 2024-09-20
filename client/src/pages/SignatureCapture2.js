import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import Lottie from "react-lottie";
import animationData from "../animation/animation6.json"; // Your animation JSON

const SignatureCapture2 = ({ onVerify }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [buttonText, setButtonText] = useState("Verify"); // Button text state
  const signaturePadRef = useRef();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isDisabled) {
      // Timer has ended
      setIsDisabled(false);
      setShowAnimation(true);
      setButtonText("Verifying Signature");
    }
    return () => clearInterval(interval);
  }, [timer, isDisabled]);

  const handleAnimationComplete = () => {
    setButtonText("Verified"); // Change button text to "Verified" after animation
    setTimeout(() => {
      setShowAnimation(false);
      onVerify(true); // Signal that the signature is verified and proceed
    }, 3000); // Wait for 3 seconds to ensure the animation plays
  };

  const handleSignature = () => {
    // Disable signing and start a 30-second timer
    setButtonText("Verifying Signature");
    setIsDisabled(true);
    setTimer(3); // 30 seconds
  };

  // CSS Styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    borderRadius: "15px",
    padding: "40px",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    margin: "20px auto",
    position: "relative",
    overflow: "hidden"
  };

  const canvasStyle = {
    border: "2px solid #00acc1",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "14px 28px",
    backgroundColor: isDisabled ? "#b0bec5" : "#00acc1",
    color: "#ffffff",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    marginTop: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const timerStyle = {
    color: "#00796b",
    fontSize: "18px",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(8px)",
    zIndex: 999,
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#004d40", marginBottom: "25px" }}>Signature Capture</h2>
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
      <button
        onClick={handleSignature}
        style={buttonStyle}
        disabled={isDisabled}
      >
        {buttonText}
      </button>
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

export default SignatureCapture2;
