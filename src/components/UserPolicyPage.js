import React from "react";
import { CardBody, Card } from "reactstrap";

function UserPolicyPage() {
  return (
    <div style={myStyle}>
      <Card className="m-2 m-md-3 m-lg-5">
        <CardBody>
          <h2>User policy</h2>
          <p>Travelicious is a blog site created for users to share their enjoyment of food and travel. This website was created as a web development project, and at any time may change or be removed.</p>
          <p>Any photos and content must be safe for viewers of all ages, without anything that may be considered offensive or inappropriate to anyone. Any content deemed offensive or inappropriate will be removed, and the user's account, access and content will be deleted. At any time, user posts or content may also be removed for any reason.</p>
          <p>This website only stores user data to allow users to access and post content. Your data is not shared with anyone, and can be deleted at anytime.</p>
          <p>As a user, you may permanently delete your profile at any time, which will remove all data from the website, including any photos, content and any user data.</p>
        </CardBody>
      </Card>
    </div>
  );
}

const myStyle = {
  minHeight: "calc(100vh - 200px)",
};

export default UserPolicyPage;
