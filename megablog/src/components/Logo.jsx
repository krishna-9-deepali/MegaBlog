import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div>
      <img
        src="blog.png"
        style={{ width: "50px", height: "50px", borderRadius: "2rem" }}
        alt=""
      />
    </div>
  );
}

export default Logo;
