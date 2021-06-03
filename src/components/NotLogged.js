import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";

function NotLogged() {
  return (
    <>
      <Banner />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-6 col-lg-4 my-4 my-sm-5">
            <p>Sorry, the page you are looking for requires you to log in.</p>
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

export default NotLogged;
