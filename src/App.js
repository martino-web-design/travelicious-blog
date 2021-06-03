import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import About from "./components/About";
import BlogPosts from "./components/BlogPosts";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import Post from "./components/Post";
import Login from "./components/Login";
import NotLogged from "./components/NotLogged";
import UserContext from "./context/UserContext";
import CountContext from "./context/CountContext";
import SessionContext from "./context/SessionContext";
import MyPosts from "./components/MyPosts";
import UserProfile from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";
import UserPolicyPage from "./components/UserPolicyPage";
import LoggedOut from "./components/LoggedOut";
import ErrorPage from "./components/ErrorPage";
import SessionTimeout from "./components/SessionTimeout";

function App() {
  // Login user data
  const [userData, setUserData] = useState({
    token: undefined,
    expires: undefined,
    iat: undefined,
    user: undefined,
    loggedIn: false,
    message: undefined,
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // verify token exists and is valid for user
      const tokenRes = await axios.post("/users/tokenIsValid", null, { headers: { "x-auth-token": token } });

      // get user and set user data
      if (tokenRes.data && !tokenRes.data.msg) {
        const userRes = await axios.get("/users/", { headers: { "x-auth-token": token } });
        setUserData({
          token,
          user: userRes.data,
          loggedIn: true,
          expires: tokenRes.data.expires,
          iat: tokenRes.data.iat,
        });
      } else {
        setUserData({ loggedIn: false });
        console.log("You're not logged in yet.");
      }
    }; // end checkin func
    checkLoggedIn();
  }, []);

  // set state of blog posts as array
  const [posts, setPosts] = useState([]);

  let loggedUser = "";
  if (userData.user) {
    loggedUser = userData.user.userName;
  }

  // -- set myPost state, updates on AddPost or EditDelete to rerender all posts
  const [myPosts, setMyPosts] = useState(false);

  // -- userPosts, filter posts by current user --
  const userPosts = posts.filter((post) => post.userName === loggedUser);

  // -- get current user post count --
  const myPostCount = userPosts.length;

  // -- get all blog posts length
  const allPostCount = posts.length;

  useEffect(() => {
    let token = localStorage.getItem("auth-token");

    axios
      .get("/posts/", { headers: { "x-auth-token": token } })
      .then((res) => [setPosts(res.data.reverse()), setMyPosts(false)])
      .catch((err) => {
        console.log(err);
      });
  }, [myPosts]);

  // Session alert
  const [sessionAlert, setSessionAlert] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <SessionContext.Provider value={{ sessionAlert, setSessionAlert }}>
          <CountContext.Provider value={{ myPosts, setMyPosts }}>
            <Nav myPostCount={myPostCount} allPostCount={allPostCount} />
            <SessionTimeout userData={userData} setUserData={setUserData} sessionAlert={sessionAlert} setSessionAlert={setSessionAlert} />
            <Switch>
              {/* --- public routes --- */}
              <Route path="/" exact render={() => <Home userData={userData} setUserData={setUserData} />} />
              <Route path="/login" exact render={() => <Login setSessionAlert={setSessionAlert} userData={userData} />} />
              <Route path="/register" component={Register} />
              <Route path="/user-policy" component={UserPolicyPage} />
              <Route path="/about" component={About} />
              <Route path="/goback" component={NotLogged} />
              <Route path="/logged-out" render={() => <LoggedOut userData={userData} />} />

              {/* --- private routes --- */}
              <Route path="/blog" render={() => <BlogPosts posts={posts} userData={userData} setUserData={setUserData} setMyPosts={setMyPosts} />} />
              <Route path="/my-posts" render={(props) => <MyPosts {...props} posts={posts} userData={userData} setUserData={setUserData} myPostCount={myPostCount} />} />
              <Route path="/post/:id" render={(props) => <Post {...props} posts={posts} setUserData={setUserData} />} />
              <Route path="/add-post" render={() => <AddPost userData={userData} setUserData={setUserData} />} />
              <Route path="/edit-post/:id" render={(props) => <EditPost {...props} posts={posts} setUserData={setUserData} />} />
              <Route path="/user-profile" render={() => <UserProfile myPostCount={myPostCount} />} />
              <Route path="/user-edit" render={() => <EditUserProfile />} />

              <Route component={ErrorPage} />
            </Switch>
            <Footer />
          </CountContext.Provider>
        </SessionContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
