import React, { useState } from "react";
import { Modal } from "reactstrap";
import deleteIcon from "../icons/delete-icon.svg";

function FeatureModalLatest(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <div onClick={toggle} className="btn w-100 bg-ccc p-3 mb-3 rounded-0" style={{ height: "135px", maxWidth: "375px" }}>
        <h4>
          Latest Posts{" "}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right text-primary" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
          </svg>
        </h4>
        <p className="text-dark">Check out the latest posts from all users.</p>
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggle} className="mt-4">
          <div className="bg-dark" style={{ position: "relative" }}>
            <span style={closeBtn} className="p-2" onClick={toggle}>
              <img src={deleteIcon} alt="Delete Icon" />
            </span>
            <h2 className="text-center text-light my-3 pt-3">Lastest Posts</h2>

            {props.posts.map((post, key) => (
              <div id={post._id} key={key} className="px-3 pb-5 pt-3">
                <span className=" text-grey ">
                  <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-person-fill text-grey" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>{" "}
                  {post.userName}
                </span>

                <div className="grid">{post.imageName ? post.imageName.map((img, key, index) => <img key={key} src={`${img}`} alt={`Image for ${post.title} post.`} className={`grid-item grid-${index.length}`} />) : <p>No image available</p>}</div>

                <span className="btn pl-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart text-danger" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>{" "}
                  <span className="badge bg-dark text-grey ml-1">3 Likes</span>
                </span>

                <h3 className="text-light mb-3">{post.title}</h3>

                <div className="text-grey">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-left-text mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path fillRule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  </svg>{" "}
                  {post.content}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </>
  );
}

const closeBtn = {
  position: "absolute",
  right: "-15px",
  top: "-20px",
};

export default FeatureModalLatest;
