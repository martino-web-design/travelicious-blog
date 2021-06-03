import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

function Post(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageName, setImageName] = useState("");
  const [userName, setUserName] = useState("");

  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    axios
      .get(`/posts/${props.match.params.id}`, { headers: { "x-auth-token": token } })
      .then((res) => [setTitle(res.data.title), setContent(res.data.content), setImageName(res.data.imageName), setUserName(res.data.userName)])
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
      });
  }, [props]);

  // default image if image not available
  const noImageAvail = (ev) => {
    ev.target.src = "/images/no-image.png";
  };

  return (
    <div className="bg-dark py-4 py-sm-5" style={{ minHeight: "100vh" }}>
      {!title && !errorMessage ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}

      {errorMessage && (
        <div className="col col-sm-9 col-lg-6 d-flex justify-content-center m-auto">
          <ErrorMessage errorMessage={errorMessage} clearMessage={() => setErrorMessage(undefined)} />
        </div>
      )}

      {!title ? null : (
        <div className="container-lg">
          <h3 className="text-light">{title}</h3>
          <span className="ml-3 text-grey">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>{" "}
            {userName}
          </span>

          <div className="grid" style={myStyleDiv}>
            {imageName ? imageName.map((img, key, index) => <img key={key} src={`${img}`} onError={noImageAvail} alt={`Image for ${title} post.`} className={`grid-item grid-${index.length} pb-2 pb-md-3`} style={myStyleImg} />) : <p>No image available</p>}
          </div>
          <div className="text-grey px-sm-3 px-lg-5">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-left-text mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path fillRule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>{" "}
            {content}
          </div>
          <br />
          <div className="d-flex d-sm-block">
            <Link to={`/blog/${props.match.params.id}`} className="btn btn-outline-light my-3 flex-grow-1">
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>{" "}
              Latest Posts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const myStyleDiv = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

const myStyleImg = {
  maxHeight: "500px",
  objectFit: "contain",
};

export default Post;
