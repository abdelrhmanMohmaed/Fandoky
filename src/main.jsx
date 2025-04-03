import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/context/UserProvider";
import { LocationProvider } from "./components/context/LocationProvider";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
