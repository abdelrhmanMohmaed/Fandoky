import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={`block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary
          ${error ? "border-2 border-rose-500" : "border-gray-300"}
        `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="absolute right-3 top-3 text-gray-400"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {error && <small className="text-rose-500">{error}</small>}
    </div>
  );
};

export default PasswordInput;
