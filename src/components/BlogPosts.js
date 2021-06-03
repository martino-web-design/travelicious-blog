import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import CountContext from "../context/CountContext";
import axios from "axios";

function BlogPosts({ posts, userData, setUserData, setMyPosts }) {
  const history = useHistory();

  let loggedUser = "";
  if (userData.user) {
    loggedUser = userData.user.userName;
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("auth-token");
      const tokenRes = await axios.post("/users/tokenIsValid", null, { headers: { "x-auth-token": token } });

      if (tokenRes.data) {
        setMyPosts(true);
      }

      if (tokenRes.data.msg) {
        setUserData({
          token: undefined,
          user: undefined,
          loggedIn: false,
          message: "Your session has timed out.",
        });
        setMyPosts(false);
        localStorage.setItem("auth-token", "");
        history.push("/login");
      }

      if (!tokenRes.data) {
        history.push("/goback");
      }
    };
    checkLoggedIn();
  }, []);

  // default image if image not available
  const noImageAvail = (ev) => {
    ev.target.src = "/images/no-image.png";
  };

  return (
    <div className="py-3 bg-dark" style={{ minHeight: "100vh" }}>
      <div className="container-lg">
        <h2 className="text-center text-light my-3">Lastest Posts</h2>

        {posts.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}

        {posts.length > 0 ? (
          posts.map((post, key) => (
            <div id={post._id} key={key} className="my-border pb-5 pt-3">
              <span className=" text-grey ">
                <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-person-fill text-grey" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>{" "}
                {post.userName}
              </span>
              <Link to={{ pathname: `/post/${post._id}` }}>
                <div className="grid">{post.imageName ? post.imageName.map((img, key, index) => <img key={key} src={`${img}`} onError={noImageAvail} alt={`Image for ${post.title} post.`} className={`grid-item grid-${index.length}`} />) : <p>No image available.</p>}</div>
              </Link>

              <Like likeId={post._id} user={loggedUser} liked={post.likes} postAuthor={post.userName} />

              <h3 className="text-light text-decoration-none">{post.title}</h3>

              <div className="text-grey px-sm-3 px-lg-5">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-left-text mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path fillRule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                </svg>{" "}
                {post.content}
              </div>
            </div>
          ))
        ) : (
          <p className="text-light">Fetching posts.</p>
        )}
      </div>
    </div>
  );
}

const Like = (props) => {
  const [count, setCount] = useState();
  const [likePost, setLikePost] = useState();

  let likes = props.user;
  let body = { likes };

  // Update MyPost Context - updates for like posts
  const { myPosts, setMyPosts } = useContext(CountContext);

  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setCount(props.liked.length);
    setLikePost(() => {
      if (props.liked.includes(props.user)) return true;
      else {
        return false;
      }
    });
  }, [likePost, count, myPosts]);

  const addLike = async () => {
    let token = localStorage.getItem("auth-token");
    await axios
      .put(`/posts/likes/add/${props.likeId}`, body, { headers: { "x-auth-token": token } })
      .then((res) => [setLikePost(true), setMyPosts(true)])
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
      });
  };
  const removeLike = async () => {
    let token = localStorage.getItem("auth-token");
    await axios
      .put(`/posts/likes/remove/${props.likeId}`, body, { headers: { "x-auth-token": token } })
      .then((res) => [setLikePost(false), setMyPosts(true)])
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
      });
  };

  const toggleLike = () => {
    if (props.postAuthor === props.user) {
      return;
    } else if (props.liked.includes(props.user)) {
      return removeLike();
    } else {
      return addLike();
    }
  };

  return (
    <>
      <span className="btn pl-0" id={props.likeId} onClick={toggleLike}>
        {!props.liked.includes(props.user) ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart text-danger" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>{" "}
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill text-danger" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg>{" "}
          </>
        )}
        {count === 0 || count > 1 ? <span className="badge bg-dark text-grey ml-1">{count} Likes</span> : <span className="badge bg-dark text-grey ml-1">{count} Like</span>}
      </span>

      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <span>
            <svg width="1.0625em" height="1em" viewBox="0 0 17 16" className="bi bi-exclamation-triangle mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
            </svg>
            {errorMessage}
          </span>
          <button onClick={() => setErrorMessage(undefined)} type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default BlogPosts;
