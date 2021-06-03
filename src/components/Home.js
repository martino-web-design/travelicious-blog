import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import FeatureModalLatest from "./FeatureModalLatest";
import FeatureModalMy from "./FeatureModalMy";
import FeatureModalEdit from "./FeatureModalEdit";

const posts = [
  {
    _id: "12849",
    userName: "TravelingWheel",
    imageName: ["/images/IMG_1963.jpg", "/images/IMG_1962.jpg", "/images/IMG_1964.jpeg", "/images/IMG_1929.jpeg"],
    title: "Bologna is full of...",
    content: "Bologna knows a thing or two about making greats meats, pasta dishes and other delicious foods. With so much history, and one of the world's oldest universities, the city is full of life.",
  },
];

function Home({ userData, setUserData }) {
  return (
    <div>
      <Banner />
      <div className="bg-light" style={{ minHeight: "65vh" }}>
        <div className="container py-4">
          {userData.message && (
            <div className="row justify-content-center">
              <div className="alert alert-success alert-dismissible fade show col col-sm-9 col-lg-6" role="alert">
                <span>
                  <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2-circle mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    <path fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z" />
                  </svg>
                  {userData.message}
                </span>
                <button onClick={() => setUserData({ token: undefined, user: undefined, loggedIn: false, message: undefined })} type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          )}
          <h2 className="text-center text-dark">Share your passion for food and travel!</h2>

          <p className="text-dark px-4">This is a blog site for food lovers and travelers alike. Whether you love to travel, explore or taste unique foods, we'd love to share your story and visual memories. We offer a private blog for users to share their food or travel related stories and photos with others who share the same passions.</p>
          <Link to="/register" className="btn btn-primary ml-4">
            Join today!
          </Link>
        </div>

        {/* --- Blog features --- */}
        <div className="container-fluid py-3 px-lg-5 background">
          <h2 className="text-light text-center py-3">Blog Features</h2>
          <div className="row row-cols-1 row-cols-md-3 mb-5">
            <div className="col text-center  ">
              <FeatureModalLatest posts={posts} />
            </div>
            <div className="col text-center ">
              <FeatureModalMy posts={posts} />
            </div>
            <div className="col text-center ">
              <FeatureModalEdit posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
