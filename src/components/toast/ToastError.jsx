import React, { useEffect } from "react";
import { toast } from "react-toastify";

function ToastError({ message }) {
  useEffect(() => {
    toast.error(message, {
      position: "bottom-right",
      className: "bg-gradient-to-r from-red-600 to-brandPrimary text-white",
    });
  }, [message]);

  return null;
}

export default ToastError;
