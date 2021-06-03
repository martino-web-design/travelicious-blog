import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop";

axios.defaults.baseURL = "https://travelicious-blog123.herokuapp.com/";

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById("root")
);
