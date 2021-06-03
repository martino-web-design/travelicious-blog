import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu, Collapse, NavbarToggler } from "reactstrap";

function Nav({ myPostCount, allPostCount }) {
  const { userData, setUserData } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // logout and clear user from local storage
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light px-lg-4">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/travel-logo.svg" alt="Travelicious logo of a compass and cutlery." className="pr-2" />
          <span className="d-md-none d-lg-block">Travelicious</span>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <ul className="navbar-nav mr-auto flex-shrink-0">
            {userData.user ? (
              <>
                <Link to="/blog" className="nav-link">
                  <li className="d-flex nav-item">
                    Blog<span style={myStyle}>{allPostCount}</span>
                  </li>
                </Link>
                <Link to="/my-posts" className="nav-link">
                  <li className="d-flex nav-item">
                    My Posts<span style={myStyle}>{myPostCount}</span>
                  </li>
                </Link>
                <Link to="/add-post" className="nav-link">
                  <li className="nav-item">Add Post</li>
                </Link>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    My Profile
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem text className="d-flex align-items-center">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person text-primary mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
                      {userData.user.userName}
                    </DropdownItem>

                    <DropdownItem divider />
                    <DropdownItem>
                      <Link to="/user-profile" className="nav-link pl-0">
                        <li className="nav-item ">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil text-primary mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                          </svg>
                          Edit Profile
                        </li>
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link onClick={logout} to="/logged-out" className="nav-link pl-0">
                        <li className="nav-item">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-box-arrow-right text-primary mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                          </svg>
                          Logout
                        </li>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <>
                <Link to="/about" className="btn nav-link">
                  <li className="nav-item">About</li>
                </Link>
                <Link to="/login" className="btn nav-link">
                  <li className="nav-item">Login</li>
                </Link>
                <Link to="/register" className="btn btn-outline-secondary nav-link">
                  <li className="nav-item">Register</li>
                </Link>
              </>
            )}
          </ul>
          {userData.user ? <li className="navbar-text">Welcome {userData.user.userName}!</li> : null}
        </Collapse>
      </nav>
    </div>
  );
}

const myStyle = {
  color: "#fff",
  fontSize: "12px",
  fontWeight: "700",
  border: "1px solid #007bff",
  borderRadius: "50%",
  backgroundColor: "#007bff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  flexDirection: "column",
  marginLeft: "4px",
};

export default Nav;
