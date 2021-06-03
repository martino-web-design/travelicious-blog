import React, { useState } from "react";
import { Modal } from "reactstrap";
import deleteIcon from "../icons/delete-icon.svg";

function FeatureModalMy(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <div onClick={toggle} className="btn w-100 bg-ccc p-3 mb-3 rounded-0" style={{ height: "135px", maxWidth: "375px" }}>
        <h4>
          My Posts{" "}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right text-primary" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
          </svg>
        </h4>
        <p className="text-dark">View all your posts grouped together.</p>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="mt-4">
        <div className="bg-dark" style={{ position: "relative" }}>
          <span style={closeBtn} className="p-2" onClick={toggle}>
            <img src={deleteIcon} alt="Delete Icon" />
          </span>
          <h2 className="text-center text-light my-3 pt-3">My Posts</h2>

          {props.posts.map((post, key) => (
            <div key={key}>
              <>
                <div className="pt-3 px-3">
                  <h3 className="text-light">{post.title}</h3>

                  <div className="grid">{post.imageName ? post.imageName.map((img, key, index) => <img key={key} src={`${img}`} alt={`Image for ${post.title} post.`} className={`grid-item grid-${index.length}`} />) : <p>No image available</p>}</div>

                  <div className="text-grey">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-left-text mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path fillRule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    </svg>{" "}
                    {post.content}
                  </div>

                  <div className="row pt-4 pb-5 justify-content-center">
                    <div className="col-sm-6 col-lg-4 pb-2">
                      <button className="btn btn-outline-light w-100">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>{" "}
                        Edit
                      </button>
                    </div>
                    <div className="col-sm-6 col-lg-4 pb-2">
                      <button className="btn btn-outline-danger w-100">
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
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

const closeBtn = {
  position: "absolute",
  right: "-15px",
  top: "-20px",
};

export default FeatureModalMy;
