import React, { useState } from "react";
import { Modal } from "reactstrap";
import deleteIcon from "../icons/delete-icon.svg";

function FeatureModalEdit(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <div onClick={toggle} className="btn w-100 bg-ccc p-3 mb-3 rounded-0" style={{ height: "135px", maxWidth: "375px" }}>
        <h4>
          Edit Post{" "}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right text-primary" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
          </svg>
        </h4>
        <p className="text-dark">Easily edit your post content and images.</p>
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggle} className="mt-4">
          {props.posts.map((post, key) => (
            <div key={key} className="py-3 py-sm-4 background" style={{ position: "relative" }}>
              <span style={closeBtn} className="p-2" onClick={toggle}>
                <img src={deleteIcon} alt="Delete Icon" />
              </span>
              <div className="container-lg">
                <div className="row justify-content-center">
                  <div className="col col-sm-9">
                    <h2 className="text-center my-3">Edit Post</h2>
                    <div>
                      <input className="form-control mb-3" type="text" value={post.title} />
                      <textarea className="form-control" type="text" value={post.content} rows="5"></textarea>
                      <span className="form-text mb-1">Add up to 4 images</span>

                      <label className="w-100 mb-2">
                        <div className="btn btn-outline-light w-100">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera text-outline-primary mr-2" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 12V6a1 1 0 0 0-1-1h-1.172a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 9.173 3H6.828a1 1 0 0 0-.707.293l-.828.828A3 3 0 0 1 3.172 5H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                            <path fillRule="evenodd" d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            <path d="M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                          </svg>
                          Select Images
                        </div>
                      </label>

                      <button className="btn btn-primary mt-2 w-100">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cloud-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                          <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>{" "}
                        Update Post
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid mx-2 mt-3 pb-5">
                  {post.imageName.map((img, index, arr) => (
                    <div key={index} className={`grid-${arr.length}`} style={{ position: "relative", backgroundColor: "#999", margin: "5px" }}>
                      <img style={{ objectFit: "cover", width: "100%", height: "100%" }} key={index} src={`${img}`} alt={`Image for ${post.title} post.`} />
                      <span style={deleteBtn}>
                        <img src={deleteIcon} alt="Delete Icon" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Modal>
      </div>
    </>
  );
}

const deleteBtn = {
  position: "absolute",
  right: "-4px",
  top: "-12px",
};

const closeBtn = {
  position: "absolute",
  right: "-15px",
  top: "-20px",
};

export default FeatureModalEdit;
