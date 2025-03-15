import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Nabbar";
import Home from "./pages/Home";
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <ToastContainer autoClose={3000} />

      {/* <About />
      <Contact /> */}
    </div>
  );
}

export default App;
