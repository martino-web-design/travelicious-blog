import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import CountContext from "../context/CountContext";
import DeletedPostMessage from "./DeletedPostMessage";

function MyPosts({ posts, userData, setUserData, myPostCount }) {
  const history = useHistory();

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  // Update MyPost Context
  const { setMyPosts } = useContext(CountContext);

  useEffect(() => {
    let token = localStorage.getItem("auth-token");

    if (token === "") {
      setUserData({
        token: undefined,
        user: undefined,
        loggedIn: false,
        message: "Your session has timed out.",
      });

      localStorage.setItem("auth-token", "");
      history.push("/login");
    }
  }, []);

  // set timeout to clear message after 4 seconds
  const clearDeleteMessage = () => {
    setTimeout(() => {
      setMessage(undefined);
      setErrorMessage(undefined);
    }, 4000);
  };

  let loggedUser = "";
  if (userData.user) {
    loggedUser = userData.user.userName;
  }

  // Delete post by id
  const deletePost = (id) => {
    let token = localStorage.getItem("auth-token");
    axios
      .delete(`/posts/${id}`, { headers: { "x-auth-token": token } })
      .then((res) => [setMessage(res.data.msg), setMyPosts(true), clearDeleteMessage()])
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
        clearDeleteMessage();
      });
  };

  // default image if image not available
  const noImageAvail = (ev) => {
    ev.target.src = "/images/no-image.png";
  };

  return (
    <div className="py-3 bg-dark" style={{ minHeight: "100vh" }}>
      <div className="container-lg">
        <h2 className="text-center text-light mt-3">My Posts</h2>

        {myPostCount > 0 ? null : (
          <p className="text-center text-white mt-3">
            Sorry, you don't have any posts yet.{" "}
            <Link to="/add-post" className="text-primary font-weight-bold">
              Add a post!
            </Link>
          </p>
        )}

        <div className="row">
          {message || errorMessage ? (
            <>
              <DeletedPostMessage message={message} errorMessage={errorMessage} />
            </>
          ) : null}
        </div>

        {posts &&
          posts.map((post, key) => (
            <div key={key}>
              {post.userName === loggedUser ? (
                <>
                  <div className="pt-4">
                    <h3 className="text-light text-decoration-none">{post.title}</h3>

                    <Link to={{ pathname: `/post/${post._id}` }}>
                      <div className="grid">{post.imageName ? post.imageName.map((img, key, index) => <img key={key} src={`${img}`} onError={noImageAvail} alt={`Image for ${post.title} post.`} className={`grid-item grid-${index.length}`} />) : <p>No image available</p>}</div>
                    </Link>

                    <div className="text-grey px-sm-3 px-lg-5">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-left-text mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path fillRule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                      </svg>{" "}
                      {post.content}
                    </div>

                    <div className="row my-4 my-sm-5 justify-content-center">
                      <div className="col-sm-6 col-lg-4 pb-2">
                        <Link to={`/edit-post/${post._id}`} className="btn btn-outline-light w-100">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                          </svg>{" "}
                          Edit
                        </Link>
                      </div>
                      <div className="col-sm-6 col-lg-4 pb-2">
                        <button onClick={() => deletePost(post._id)} className="btn btn-outline-danger w-100">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>{" "}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyPosts;
