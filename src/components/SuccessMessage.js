import React from "react";
import { Link } from "react-router-dom";

function SuccessMessage(props) {
  return (
    <>
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <span>
          <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2-circle mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            <path fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z" />
          </svg>
          {props.message}
          {props.postLocation && (
            <Link to={{ pathname: `/post/${props.postLocation}` }} className="font-weight-bold">
              {" "}
              here!
            </Link>
          )}
        </span>
        <button onClick={props.clearMessage} type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
}

export default SuccessMessage;