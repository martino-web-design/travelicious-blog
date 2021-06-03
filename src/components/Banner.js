import React from "react";

function Banner() {
  return (
    <div style={{ position: "relative" }}>
      <img src="/road-toledo.jpg" alt="Road winding through rolling hills." className="banner" />
      <div className="d-flex align-items-center mt-sm-5 ml-sm-4" style={logoStyle}>
        <img src="travel-logo.png" alt="Travelicious logo displaying compass with cutlery." className="home-logo" />
      </div>
    </div>
  );
}

const logoStyle = {
  position: "absolute",
  left: "10px",
  top: "110px",
};

export default Banner;
