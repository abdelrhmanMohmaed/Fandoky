import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { toast } from "react-toastify";
import { verify, resendOtp } from "../../services/auth";
import OTPInput from "../inputs/OTPInput";
import { UserContext } from "../../components/context/UserContext";

const VerifiedModal = ({ open, setOpen }) => {
  const { updateVerified } = useContext(UserContext);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // OTP
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await verify({ otp });
      updateVerified(response.data.user.email_verified_at);
      toast.success("OTP verified successfully!", {
        position: "bottom-right",
        className:
          "bg-gradient-to-r from-brandPrimary to-brandSecondary text-white custom-toast-success",
      });
      setOpen(false);
    } catch (error) {
      setError(`${error.message}`);
      toast.error(
        `OTP verification failed: ${error.message || "Please try again."}`,
        {
          position: "bottom-right",
          className: "bg-gradient-to-r from-red-600 to-brandPrimary text-white",
        }
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // OTP Resend
  const handleResendOTP = async () => {
    try {
      const response = await resendOtp();

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "bottom-right",
          className:
            "bg-gradient-to-r from-brandPrimary to-brandSecondary text-white custom-toast-success",
        });
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
          className: "bg-gradient-to-r from-red-600 to-brandPrimary text-white",
        });
      }
    } catch (error) {
      toast.error(
        `Resend OTP failed: ${error.message || "Please try again."}`,
        {
          position: "bottom-right",
          className: "bg-gradient-to-r from-red-600 to-brandPrimary text-white",
        }
      );
      console.log(error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-[1000]"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 border border-brandBackground-paper">
          <DialogTitle
            as="h3"
            className="text-xl font-bold text-center mb-4 text-brandPrimary"
          >
            Enter OTP
          </DialogTitle>
          <div className="mb-6 text-center text-gray-700">
            Please enter the OTP sent to your email to verify your account.
          </div>
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            {/* OTP Input */}
            <OTPInput onChangeOTP={setOtp} />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 mt-4 text-white rounded-md bg-gradient-to-r from-brandPrimary to-brandSecondary transition-colors duration-300 ease-in-out hover:from-brandSecondary hover:to-brandPrimary ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          <div className="mt-4 text-center text-sm">
            Didn't receive the OTP?{" "}
            <button
              onClick={handleResendOTP}
              className="underline text-brandPrimary hover:text-[#3A6F81]"
            >
              Resend OTP
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default VerifiedModal;
