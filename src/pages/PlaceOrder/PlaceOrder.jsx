import React from "react";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-field">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>

        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />

        <div className="multi-field">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>

        <div className="multi-field">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>

        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right"></div>
    </form>
  );
};

export default PlaceOrder;