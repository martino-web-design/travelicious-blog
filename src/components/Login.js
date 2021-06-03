import Axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };

      const loginRes = await Axios.post("/users/login", loginUser);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        expires: loginRes.data.expires,
        expireAlert: loginRes.data.expireAlert,
        iat: loginRes.data.iat,
      });
      localStorage.setItem("auth-token", loginRes.data.token);

      // Redirect to blog page after login
      history.push("/blog");
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.msg);
      } else {
        setMessage("There was an error. Please try to log in again later.");
      }
    }
  };

  return (
    <>
      <div className="background py-3 py-sm-4" style={{ minHeight: "100vh" }}>
        <div className="container-md">
          <div className="row justify-content-center">
            {message && (
              <div className="alert alert-danger alert-dismissible fade show col col-sm-9 col-lg-6" role="alert">
                <span>
                  <svg width="1.0625em" height="1em" viewBox="0 0 17 16" className="bi bi-exclamation-triangle mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                  </svg>
                  {message}
                </span>
                <button onClick={() => setMessage(undefined)} type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
          </div>

          <div className="row justify-content-center">
            <div className=" col col-sm-6 col-lg-4">
              <h2 className="text-center text-light pb-2">Login</h2>
              <form onSubmit={submit} autoComplete="off">
                <div className="form-group">
                  <input onChange={onChangeEmail} className="form-control mb-3" type="text" placeholder="Email" />

                  <input onChange={onChangePassword} className="form-control mb-3" type="password" placeholder="Password" />

                  <button className="btn btn-primary mt-3 w-100">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
