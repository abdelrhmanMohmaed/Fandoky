import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  FaEnvelope,
  FaLock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { login } from "../../services/auth";

export default function LoginModal({ open, setOpen, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      setIsLoggedIn(true);
      setOpen(false);

      toast.success("Login successful.", {
        className:
          "bg-gradient-to-r from-brandPrimary to-brandSecondary text-white custom-toast-success",
        position: "bottom-right",
      });

      setEmail("");
      setPassword("");
    } catch (error) {
      setError(`${error.message}`);
      toast.error("Login failed. Please try again.", {
        className: "bg-red-500 text-white",
        position: "bottom-right",
      });
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-[1000]"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
          <DialogTitle
            as="h3"
            className="text-lg font-semibold text-gray-900 text-center mt-3 mb-5"
          >
            Login
          </DialogTitle>

          {/* <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center">
              <FaFacebook className="mr-2" /> Facebook
            </button>
            <button className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center">
              <FaTwitter className="mr-2" /> Twitter
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center">
              <FaLinkedin className="mr-2" /> LinkedIn
            </button>
          </div>

          <div className="text-center my-4 text-gray-500">Or</div> */}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-brandPrimary"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-brandPrimary"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a
                href="#"
                className="text-brandPrimary hover:text-brandSecondary"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 text-white rounded ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-brandSecondary to-brandPrimary hover:from-brandPrimary to-brandSecondary"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            <span className="text-gray-500">Don't have an account?</span>
            <a
              href="#"
              className="ml-1 text-brandPrimary hover:text-brandSecondary"
            >
              Register
            </a>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
