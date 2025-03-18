import React, { useEffect } from "react";
import { toast } from "react-toastify";

function ToastSuccess({ message }) {
  useEffect(() => {
    toast.success(message, {
      className:
        "bg-gradient-to-r from-brandPrimary to-brandSecondary text-white custom-toast-success",
      position: "bottom-right",
    });
  }, [message]);

  return null;
}

export default ToastSuccess;
