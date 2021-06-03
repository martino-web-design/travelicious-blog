import React from "react";

function About() {
  return (
    <>
      <img src="/road-toledo.jpg" alt="Road winding through rolling hills." className="banner about" />

      <div className="container py-4 px-lg-5" style={myStyle}>
        <h2>About</h2>
        <div>
          <p>Travelicious is a blog site created for users to share their enjoyment of food and travel. If you like either one or the other, that's ok. For many, tasting and capturing delicious, unique, or exotic foods is a passion. And doing this usually requires traveling at least a short distance, if not around the world.</p>
          <p>We'd love to see photos of the new foods you've tried and the places you explored. Share your posts to inspire others to venture out, or even to get inspired to try a new recipe at home.</p>
          <p>This website was created as a web development project, but hopefully will become useful in sharing passions for food and travel. Enjoy!</p>
        </div>
      </div>
    </>
  );
}

const myStyle = {
  minHeight: "calc(100vh - 400px)",
};

export default About;
