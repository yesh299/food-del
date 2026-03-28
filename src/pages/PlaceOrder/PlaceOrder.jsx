import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartItem,url } = useContext(StoreContext);
  const [errorMessage, setErrorMessage] = useState("");

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:"",
  })

  const onchangeHandler = (event) => { 
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!token) {
      setErrorMessage("Please sign in before placing an order.");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItem[item._id] };
        orderItems.push(itemInfo);
      }
    });

    if (orderItems.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }

    try {
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}}); //API
      if (response.data.success) {
        const {session_url} = response.data;
        if (session_url) {
          window.location.replace(session_url);
          return;
        }
      }

      if (response.data.message?.toLowerCase().includes("stripe authentication failed")) {
        setErrorMessage("Payment service is temporarily unavailable. Please try again in a few minutes.");
      } else {
        setErrorMessage(response.data.message || "Unable to create Stripe checkout session.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Payment request failed.");
    }
  }

const navigate = useNavigate();

    useEffect(() => {
      const totalAmount = getTotalCartAmount();
      if (!token) {
        navigate("/cart");
      }
      else if (totalAmount === 0) {
        navigate("/cart");
      }
    },[token, navigate, getTotalCartAmount]);


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-field">
          <input required name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>

        <input required name="email" onChange={onchangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onchangeHandler} value={data.street} type="text" placeholder="Street" />

        <div className="multi-field">
          <input required name="city" onChange={onchangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onchangeHandler} value={data.state} type="text" placeholder="State" />
        </div>

        <div className="multi-field">
          <input required name="zipCode" onChange={onchangeHandler} value={data.zipCode} type="text" placeholder="Zip code" />
          <input required name="country" onChange={onchangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>

        <input required name="phone" onChange={onchangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>

          <button type="submit" >PROCEED TO PAYMENT</button>
          {errorMessage ? <p style={{ color: "#c0392b", marginTop: "10px" }}>{errorMessage}</p> : null}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
