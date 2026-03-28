import React, { useCallback, useContext, useState, useEffect } from "react";
import axios from "axios";
import "./MyOrders.css";
import { StoreContext } from "../../../context/storeContext";
import { assets } from "../../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        url + "/api/order/usersOrders",
        {},
        { headers: { token } },
      );
      setData(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch user orders", error);
      setData([]);
    }
  }, [token, url]);

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(() => {
        fetchOrders();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [token, fetchOrders]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div className="my-orders-order" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}{" "}
            </p>
            <p> ${order.amount}.00 </p>
            <p> item:{order.items.length} </p>
            <p>
              {" "}
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders} >Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
