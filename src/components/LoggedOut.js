import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";

function LoggedOut() {
  const [message, setMessage] = useState("You have logged out successfully!");

  const clearMessage = () => {
    setMessage(undefined);
  };

  return (
    <>
      <Banner />
      <div className="container" style={myStyle}>
        <div className="row justify-content-center">
          {message && (
            <div className="mt-4 mt-sm-5 col col-sm-6 col-lg-5">
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                <span>{message}</span>
                <button onClick={clearMessage} type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="row justify-content-center">
          <div className="col col-sm-6 col-lg-4 py-5">
            <Link to={"/login"}>
              <button className="btn btn-secondary mt-3  w-100">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>{" "}
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const myStyle = {
  minHeight: "calc(100vh - 400px)",
};

export default LoggedOut;
