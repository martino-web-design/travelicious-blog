import React, { useState, useEffect, useContext } from "react";
import CountContext from "../context/CountContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import deleteIcon from "../icons/delete-icon.svg";

function AddPost({ userData, setUserData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState([]);
  const [cloudId, setCloudId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postLocation, setPostLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  // Update MyPost Context
  const { setMyPosts } = useContext(CountContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("auth-token");
      const tokenRes = await axios.post("/users/tokenIsValid", null, { headers: { "x-auth-token": token } });
      if (tokenRes.data.msg) {
        setUserData({
          token: undefined,
          user: undefined,
          loggedIn: false,
          message: "Your session has timed out.",
        });
        localStorage.setItem("auth-token", "");
        history.push("/login");
      }
      if (!tokenRes.data) {
        history.push("/goback");
      }
    };
    checkLoggedIn();
  }, []);

  let username = "";
  if (userData.user) {
    username = userData.user.userName;
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeFile = async (e) => {
    const formData = new FormData();
    let files = e.target.files;
    let file;

    // validate file size not too large
    for (let i = 0; i < files.length; i++) {
      file = files[i];

      // limit image size to 3MB
      if (file.size > 3000000) {
        return setErrorMessage("Image size is too large. Make sure each image is under 3MB.");
      }
    }

    // --- set cloudinary id for each image
    let cloudIdArray = [...cloudId];

    // --- set cloudinary url for each image
    let cloudUrlArray = [...fileName];

    // --- verifies not exceeding more than 4 image uploads in total
    let imageTotal = cloudUrlArray.length + files.length;

    // -- Add form data to append file, loops through each and uploads one at a time
    if (imageTotal < 5) {
      for (let i = 0; i < files.length; i++) {
        file = files[i];

        formData.append("file", file);
        formData.append("upload_preset", "travelicious_blog_images"); // add cloudinary info
        setLoading(true);

        await axios
          .post("https://api.cloudinary.com/v1_1/traveliciousblog/image/upload", formData)
          .then((res) => [(cloudUrlArray = [...cloudUrlArray, res.data.secure_url]), (cloudIdArray = [...cloudIdArray, res.data.public_id]), setLoading(false)])
          .catch(() => {
            setErrorMessage("An error occured uploading your images. Try again later.");
          });
      } // end for each
    } else {
      return setErrorMessage("Max number of images to upload is 4.");
    }

    setFileName(cloudUrlArray);
    setCloudId(cloudIdArray);
  }; // --- end onChangeFile ---

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const formDataTwo = new FormData();

    // text fields to add
    formDataTwo.append("title", title);
    formDataTwo.append("content", content);
    // image names string
    formDataTwo.append("imageName", fileName);

    // add userName from logged user
    formDataTwo.append("userName", username);

    // add post content - api posts/add
    let token = localStorage.getItem("auth-token");
    await axios
      .post("/posts/add/", { title, content, userName: username, imageName: fileName, cloudId }, { headers: { "x-auth-token": token } })
      .then((res) => [setFileName(""), setCloudId(""), setTitle(""), setContent(""), setMessage(res.data.msg), setPostLocation(res.data.id), setMyPosts(true)])
      .catch((err) => setErrorMessage(err.response.data.msg));
  }; // --- end on Submit ---

  // Delete image before posting (if user selected wrong image)
  const deleteUploadImage = async (id, index, img) => {
    let token = localStorage.getItem("auth-token");
    await axios
      .post(`/posts/image`, { uploadImage: id[index] }, { headers: { "x-auth-token": token } })
      .then((res) => [setMessage(res.data.msg), remove(img, id[index])])
      .catch((err) => [setErrorMessage(err.response.data.msg)]);
  };
  // Clear deleted thumb image and data from submit form
  const remove = (img, id) => {
    const arr = fileName.filter((item) => item !== img);
    setFileName(arr);

    const arrTwo = cloudId.filter((item) => item !== id);
    setCloudId(arrTwo);
  };

  return (
    <div className="py-3 py-sm-4 background" style={{ minHeight: "100vh" }}>
      <div className="container-md">
        <div className="row justify-content-center">
          <div className="col col-sm-9 col-lg-6">
            {message && <SuccessMessage message={message} postLocation={postLocation} clearMessage={() => setMessage(undefined)} />}

            {errorMessage && <ErrorMessage errorMessage={errorMessage} clearMessage={() => setErrorMessage(undefined)} />}

            <h2 className="text-center text-light my-3">Add a new post</h2>

            <form encType="multipart/form-data" onSubmit={onSubmitForm}>
              <input className="form-control mb-3" type="text" value={title} name="title" onChange={onChangeTitle} placeholder="Title" autoComplete="off" />

              <textarea className="form-control mb-3" type="text" value={content} name="content" onChange={onChangeContent} placeholder="Share a story about your photos" rows="5"></textarea>

              <span className="form-text mb-1">Add up to 4 images</span>

              <label htmlFor="imageNameUpload" className="w-100 mb-2">
                <div className="btn btn-outline-light w-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="bi bi-camera text-outline-primary mr-2">
                    <path fillRule="evenodd" d="M15 12V6a1 1 0 0 0-1-1h-1.172a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 9.173 3H6.828a1 1 0 0 0-.707.293l-.828.828A3 3 0 0 1 3.172 5H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                    <path fillRule="evenodd" d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    <path d="M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                  </svg>
                  Select Images
                </div>
              </label>
              <input name="image" type="file" accept="image/png, image/jpeg" style={{ display: "none" }} onChange={onChangeFile} multiple id="imageNameUpload" />

              {/* ------- spinner on image loading ------ */}
              {loading && (
                <div className="text-center mt-2">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}

              <button className="btn btn-primary mt-2 w-100">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cloud-upload mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                  <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                </svg>
                Submit Post
              </button>
            </form>
          </div>
        </div>
        <div className="grid mx-3 mt-3 pb-5">
          {fileName &&
            fileName.map((img, index, arr) => (
              <div key={index} className={`grid-${arr.length}`} style={{ position: "relative", backgroundColor: "#999", margin: "5px" }}>
                <img style={{ objectFit: "cover", width: "100%", height: "100%" }} onClick={() => deleteUploadImage(cloudId, index, img)} key={index} src={`${img}`} alt="" />
                <span style={deleteBtn}>
                  <img src={deleteIcon} alt="Delete Icon" />
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const deleteBtn = {
  position: "absolute",
  right: "-4px",
  top: "-12px",
};

export default AddPost;
