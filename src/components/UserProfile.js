import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import DeleteModal from "./DeleteModal";

function UserProfile() {
  const history = useHistory();

  // clear user token data on delete
  const { userData, setUserData } = useContext(UserContext);

  const [message, setMessage] = useState();

  const clearMessage = () => {
    setMessage(undefined);
  };

  // redirect to login if not logged in
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

  const deleteUser = () => {
    const id = userData.user.id;
    const token = localStorage.getItem("auth-token");
    axios
      .delete(`/users/delete/${id}`, { headers: { "x-auth-token": token } })
      .then((res) => [
        setUserData({
          token: undefined,
          user: undefined,
          loggedIn: false,
          message: res.data.msg,
        }),
        localStorage.setItem("auth-token", ""),
        // Redirect to home page after deleting user
        history.push("/"),
      ])
      .catch((err) => {
        err.response.data.msg && setMessage(err.response.data.msg);
      });
  };

  return (
    <>
      <div className="bg-secondary py-3 py-sm-4" style={{ minHeight: "100vh" }}>
        <div className="container py-3">
          <div className="row justify-content-center">
            <div className="col col-md-9 col-lg-6">
              <div className="card ">
                <h3 className="card-header">Profile</h3>
                <div className="card-body">
                  {userData.user ? (
                    <>
                      <p className="card-text">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person text-primary mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                        {userData.user.userName}
                      </p>
                      <p>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope text-primary mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                        </svg>
                        {userData.user.email}
                      </p>
                    </>
                  ) : null}
                  <h5 className="card-title">Update your password</h5>

                  <Link to="/user-edit">
                    <button className="btn btn-outline-primary w-100">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>{" "}
                      Edit
                    </button>
                  </Link>

                  <p className="mt-3">If you would like to delete your accout</p>

                  <DeleteModal deleteUser={deleteUser} message={message} clearMessage={clearMessage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
