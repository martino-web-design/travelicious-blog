import Axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

function ChangeUserProfile() {
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [passVerify, setPassVerify] = useState();

  const [message, setMessage] = useState(); // error messages
  const [update, setUpdate] = useState(); // update success message

  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  // redirect to login if not logged in or no token
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("auth-token");
      const tokenRes = await axios.post("/users/tokenIsValid", null, { headers: { "x-auth-token": token } });

      if (!tokenRes.data) {
        return history.push("/goback");
      }
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
    }; // end checkin func
    checkLoggedIn();
  }, []);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onPassVerify = (e) => {
    setPassVerify(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth-token");

    try {
      const userID = userData.user.id;
      const editUser = { password, newPassword, passVerify, userID };

      const userUpdate = await Axios.post("/users/edit", editUser, { headers: { "x-auth-token": token } });
      setUpdate(userUpdate.data.msg);
    } catch (err) {
      if (err.response.data.msg) {
        setMessage(err.response.data.msg);
      } else {
        setMessage("Sorry, there was an error. Please try to update later.");
      }
    }
  };

  return (
    <div className="background" style={{ height: "100vh" }}>
      <div className="container-md py-3">
        <div className="row justify-content-center">
          <div className=" col col-sm-6 col-lg-4">
            {message && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <span>{message}</span>
                <button onClick={() => setMessage(undefined)} type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            {update && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                <span>{update}</span>
                <button onClick={() => [setUpdate(undefined), history.push("/user-profile")]} type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <h2 className="text-center text-light my-3">Password Update</h2>
            <form onSubmit={submit} autoComplete="off">
              <div className="form-group">
                <input onChange={onChangePassword} className="form-control mb-3" type="password" placeholder="Current Password" />

                <input onChange={onNewPassword} className="form-control mb-3" type="password" placeholder="New Password" />

                <input onChange={onPassVerify} className="form-control mb-3" type="password" placeholder="Verify New Password" />

                <button className="btn btn-primary w-100 mt-3">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cloud-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                    <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>{" "}
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeUserProfile;
