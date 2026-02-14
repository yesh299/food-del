import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>

      <p className="explore-menu-text">
        Choose from a wide variety of tasty dishes made with fresh ingredients
        and full of flavor. We offer something for everyone, whether you love
        spicy food, sweet treats, or healthy meals. Our goal is to satisfy your
        hunger and make every meal enjoyable, special, and memorable. With quick
        delivery and great service, we bring your favorite food right to your
        doorstep.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name,
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
