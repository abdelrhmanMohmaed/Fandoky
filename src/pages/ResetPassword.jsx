import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../services/auth";
import PasswordStrengthBar from "react-password-strength-bar";
import bigLogo from "../assets/bigLogo.png";
// Inputs
import OTPInput from "../components/inputs/OTPInput";
import PasswordInput from "../components/inputs/PasswordInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const isStrongPassword = (password) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );
    return strongRegex.test(password);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setErrors({});

    let valid = true;
    const newErrors = {};
    // match
    if (newPassword !== confirmPassword) {
      newErrors.newPassword = "Passwords do not match!";
      newErrors.confirmPassword = "Passwords do not match!";
      valid = false;
    }
    // Strong pass
    if (!isStrongPassword(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
      valid = false;
    }
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        email,
        otp,
        password: newPassword,
        password_confirmation: confirmPassword,
      };
      const response = await resetPassword(payload);
      toast.success(response.data.message, {
        position: "bottom-right",
        className: "bg-gradient-to-r from-brandPrimary to-brandSecondary text-white custom-toast-success",
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Password reset failed. Please try again.", {
          position: "bottom-right",
          className: "bg-gradient-to-r from-red-600 to-brandPrimary text-white",
        });
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-brandPrimary to-brandSecondary px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-7 border border-brandBackground-paper">
        <div className="flex justify-center">
          <img src={bigLogo} alt="Queفند Logo" className="h-auto w-32 pb-2" />
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-2 text-brandPrimary">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-2">
          Enter your OTP, email, and new password below to reset your password.
        </p>
        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <OTPInput onChangeOTP={setOtp} />
            {errors.otp && (
              <small>
                <strong className="text-rose-500">{errors.otp}</strong>
              </small>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <small>
                <strong className="text-rose-500">{errors.email}</strong>
              </small>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>

            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              error={errors.newPassword}
            />

            <PasswordStrengthBar password={newPassword} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className={`block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary
                ${
                  errors.confirmPassword
                    ? "border-2 border-rose-500"
                    : "border-gray-300"
                }
              `}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <small>
                <strong className="text-rose-500">
                  {errors.confirmPassword}
                </strong>
              </small>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 mt-4 text-white rounded-md bg-gradient-to-r from-brandPrimary to-brandSecondary transition-colors duration-300 ease-in-out hover:from-brandSecondary hover:to-brandPrimary ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
