import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a wide variety of tasty dishes. Our goal is to satisfy
          your hunger and make every meal enjoyable and special.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
