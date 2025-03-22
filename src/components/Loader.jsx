import React from "react";
import IconRenderer from "./icon/IconRenderer";

function Loader() {
  return (
    <div className="z-60 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-brandBackground-default bg-opacity-70 backdrop-blur-md z-50 transition-opacity duration-300 ease-in-out">
        <IconRenderer iconName={"HashLoader"} color="#4D869C" size={80} />
    </div>
  );
}

export default Loader;
