import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

function UserPolicyModal() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <Button color="primary" onClick={toggle} style={{ width: "100%", marginBottom: "1rem" }}>
        View user policy
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>User policy</ModalHeader>
        <ModalBody>
          <p>Travelicious is a blog site created for users to share their enjoyment of food and travel. This website was created as a web development project, and at any time may change or be removed.</p>
          <p>Any photos and content must be safe for viewers of all ages, without anything that may be considered offensive or inappropriate to anyone. Any content deemed offensive or inappropriate will be removed, and the user's account, access and content will be deleted. At any time, user posts or content may also be removed for any reason.</p>
          <p>This website only stores user data to allow users to access and post content. Your data is not shared with anyone, and can be deleted at anytime.</p>
          <p>As a user, you may permanently delete your profile at any time, which will remove all data from the website, including any photos, content and any user data.</p>
        </ModalBody>
      </Modal>
    </>
  );
}

export default UserPolicyModal;
