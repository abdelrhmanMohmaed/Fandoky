import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendResetLinkEmail } from "../services/auth";
import bigLogo from "../assets/bigLogo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendLink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await sendResetLinkEmail(email);
      toast.success(res.data.message, {
        position: "bottom-right",
        className: "bg-brandPrimary text-white",
      });

      setEmail("");
      setError("");
    } catch (error) {
      setError(`${error.message}`);
      toast.error("Failed to send reset link", {
        position: "bottom-right",
        className: "bg-red-500 text-white",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* First Side (Left) */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-brandPrimary to-brandSecondary text-white flex flex-col justify-center items-center p-8">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-white/80 hover:text-white mb-6 flex items-center self-start"
        >
          <svg
            className="h-4 w-4 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </button>

        <div className="max-w-sm w-full bg-white text-brandPrimary rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2">Forgot Your Password?</h2>
          <p className="text-sm mb-6">
            Enter the email address linked to your account, and we’ll send you a
            link to reset your password.
          </p>
          <form onSubmit={handleSendLink} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700">
                Email
              </span>
              <input
                type="email"
                className={`mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brandPrimary
                ${error ? "border-2 border-rose-500" : ""}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 w-full py-2 text-white rounded 
              bg-gradient-to-r from-brandPrimary to-brandSecondary
              transition-colors duration-300 ease-in-out hover:from-brandSecondary hover:to-brandPrimary
            ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            Wait, I remember my password...{" "}
            <span
              onClick={() => navigate("/")}
              className="text-brandPrimary hover:text-[#3A6F81] cursor-pointer"
            >
              Click here
            </span>
          </div>
        </div>
      </div>
      {/* Second Side (Right) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-l from-brandPrimary to-brandSecondary flex-col justify-center items-center p-10">
        <img
          src={bigLogo}
          alt="Queفند Logo"
          className="h-auto w-80 pb-5"
        />
        <h3 className="text-2xl font-extrabold mb-2 tracking-wide font-mono text-white">
          QUEفند
        </h3>
        <p className="text-sm text-center max-w-xs text-white/80 hover:text-white ">
          Your gateway to exclusive hotel bookings and unique travel
          experiences.
        </p>
      </div>
    </div>
  );
}
