import React from "react";

function DeletedPostMessage(props) {
  return (
    <>
      {props.message && (
        <div style={myStyle} className="col-9 col-md-6 col-lg-4 alert alert-success alert-dismissible fade show" role="alert">
          <span>
            <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2-circle mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              <path fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z" />
            </svg>
            {props.message}
          </span>
        </div>
      )}
      {props.errorMessage && (
        <div style={myStyle} className="alert alert-danger alert-dismissible fade show" role="alert">
          <span>
            <svg width="1.0625em" height="1em" viewBox="0 0 17 16" className="bi bi-exclamation-triangle mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
            </svg>
            {props.errorMessage}
          </span>
        </div>
      )}
    </>
  );
}

const myStyle = {
  position: "fixed",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "1000",
};

export default DeletedPostMessage;
