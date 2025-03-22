import { useContext, useState } from "react";
import IconRenderer from "../icon/IconRenderer";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/auth";
// Input
import PasswordInput from "../inputs/PasswordInput";
// Context
import { UserContext } from "../../components/context/UserContext";

export default function LoginModal({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateUser, updateVerified } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login({ email, password, rememberMe });

      updateUser(response.data.user.name);
      if (response.data.user.email_verified_at) {
        updateVerified(true);
      } else {
        updateVerified(false);
      }

      setOpen(false);

      toast.success("Login successful.", {
        className:
          "bg-gradient-to-r from-brandPrimary to-brandSecondary text-white custom-toast-success",
        position: "bottom-right",
      });

      setEmail("");
      setPassword("");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
              <IconRenderer iconName={"FaFacebook"} className={"mr-2"} />{" "}
              Facebook
            </button>
            <button className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center">
              <IconRenderer iconName={"FaTwitter"} className={"mr-2"} /> Twitter
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center">
              <IconRenderer iconName={"FaLinkedin"} className={"mr-2"} />{" "}
              LinkedIn
            </button>
          </div>

          <div className="text-center my-4 text-gray-500">Or</div> */}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                required
                className={`block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary
                  ${error ? "border-2 border-rose-500" : "border-gray-300"}
                `}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              error={""}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  type="checkbox"
                  className="mr-2"
                />{" "}
                Remember me
              </label>
              <NavLink
                to="/forgot-password"
                className="text-brandPrimary hover:text-brandSecondary"
              >
                Forgot password?
              </NavLink>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 mt-4 text-white rounded-md bg-gradient-to-r from-brandPrimary to-brandSecondary transition-colors duration-300 ease-in-out hover:from-brandSecondary hover:to-brandPrimary
                ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
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
