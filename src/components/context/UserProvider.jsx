import React, { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(
    sessionStorage.getItem("userName") || null
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("userName")
  );

  const [verified, setVerified] = useState(() => {
    const stored = sessionStorage.getItem("verified");
    return stored == "true";
  });

  const updateUser = (name) => {
    setUserName(name);
    setIsLoggedIn(!!name);
    if (name) {
      sessionStorage.setItem("userName", name);
    } else {
      sessionStorage.removeItem("userName");
    }
  };

  const updateVerified = (email_verified_at) => {
    const isTrue = !!email_verified_at;
    setVerified(isTrue);

    if (isTrue) {
      sessionStorage.setItem("verified", "true");
    } else {
      sessionStorage.setItem("verified", "false");
    }
  };
  return (
    <UserContext.Provider
      value={{ userName, verified, isLoggedIn, updateUser, updateVerified }}
    >
      {children}
    </UserContext.Provider>
  );
};
