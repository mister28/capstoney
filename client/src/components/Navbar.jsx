import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // one column for the left sidebar, right sidebar, and two for the middle
    <div className="grid grid-cols-1 md:grid-cols-3 my-5 justify-center">
      <Link to="/" className="mx-auto md:mx-0">
        <img
          src="/chirp-logo-v1-cropped.jpg"
          alt="Chrip Site logo"
          width={"80px"}
          className="ml-8"
        />
      </Link>

      <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center">
          <h2
            className="text-center font-bold text-4xl text-blue-500"
            style={{ WebkitTextStroke: ".5px black", color: "#3b82f6" }}
          >
            Chirper
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
