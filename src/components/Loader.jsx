import React from "react";
import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <div className="loader-overlay">
        <HashLoader color="#36D7B7" size={80} />
    </div>
  );
}

export default Loader;
