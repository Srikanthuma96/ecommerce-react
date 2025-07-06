import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!phone.match(/^\d{10}$/)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }
    // Simulate sending OTP
    alert("OTP sent to " + phone);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      alert("OTP Verified. You can now reset your password.");
      navigate("/");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-container">
        <Navbar/>
      <h2>Forgot Password</h2>

      {step === 1 && (
        <>
          <div className="input-group">
            <label>Enter Phone Number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile"
            />
          </div>
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="input-group">
            <label>Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
            />
          </div>
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
