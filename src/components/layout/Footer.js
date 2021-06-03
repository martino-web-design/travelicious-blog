import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className=" container-fluid py-3 py-lg-4 bg-light">
      <div className="row px-3 px-sm-5 py-2">
        <Link to="/about" className="col text-dark">
          About
        </Link>
        <Link to="/user-policy" className="col text-dark">
          User policy
        </Link>
      </div>
      <div className="row px-3 px-sm-5 py-2">
        <p className="col text-secondary font-weight-bold">
          <span className="text-secondary">&copy; 2021</span> Travelicious
        </p>

        <p className="col text-secondary justify-content-between">
          Designed by{" "}
          <a href="https://martinowebdesign.com" className="text-secondary font-weight-bold">
            Brian Martino
          </a>
        </p>
      </div>
      <div className="row justify-content-end mr-2">
        <a href="#top">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-up-circle-fill text-dark" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Footer;
