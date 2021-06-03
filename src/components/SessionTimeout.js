import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function SessionTimeout({ userData, setUserData, sessionAlert, setSessionAlert }) {
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState();
  const [okBtn, setOkBtn] = useState(true);

  // Modal launches when expire alert timer starts
  // closes with click/logout btn or is set to false when session time is up
  const toggle = () => {
    setSessionAlert(false);
  };

  // logout and clear user from local storage
  const logout = () => {
    setSessionAlert(false);
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/logged-out");
  };

  useEffect(() => {
    if (userData.iat) {
      // get current time to compare against expire time (will allow timer to reset if page is reloaded)
      const currTime = new Date();
      const alertTime = userData.expires * 1000 - 120000;
      const timer = alertTime - currTime;

      let token = localStorage.getItem("auth-token");

      setTimeout(() => {
        let checkToken = localStorage.getItem("auth-token");
        if (token === checkToken) {
          // launch modal function if still logged in
          launchAlert();
        } else {
          console.log("You're already logged out.");
        }
      }, timer);
    }
  }, [userData.iat]);

  // run launch alert if logged in and token matches
  const launchAlert = () => {
    setSessionAlert(true); // launches modal
    setOkBtn(true);
    setAlertMessage("Your session will expire in 2 minutes.");

    let token = localStorage.getItem("auth-token");

    const currTime = new Date();
    const expireTime = userData.expires * 1000;
    const timer = expireTime - currTime;

    setTimeout(() => {
      let newToken = localStorage.getItem("auth-token");

      if (token === newToken) {
        setOkBtn(false);
        setSessionAlert(true); // launches modal
        setAlertMessage("Your session is expired, please log out.");
      } else {
        console.log("You're already logged out.");
      }
    }, timer);
  };

  return (
    <>
      {sessionAlert && (
        <div>
          <Modal isOpen={sessionAlert}>
            {okBtn ? <ModalHeader toggle={toggle}>Session ending soon</ModalHeader> : <ModalHeader toggle={toggle}>Session expired</ModalHeader>}
            <ModalBody>{alertMessage}</ModalBody>
            <ModalFooter>
              {okBtn ? (
                <Button color="secondary" onClick={toggle}>
                  Ok
                </Button>
              ) : null}
              <Button color="primary" onClick={logout}>
                Log out
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </>
  );
}

export default SessionTimeout;
