import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { StoreContext } from "./storeContext";

const StoreContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const defaultApiBase =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:4000"
      : "https://food-del-backend-2bhv.onrender.com";
  const url = import.meta.env.VITE_API_URL || defaultApiBase;
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } },
        );
      } catch (error) {
        console.error("Failed to add item to cart", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } },
        );
      } catch (error) {
        console.error("Failed to remove item from cart", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = useCallback(async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [url]);

  const loadedCart = useCallback(async (tokenValue) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: tokenValue } });
      setCartItem(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart", error);
      setCartItem({});
    }
  }, [url]);

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadedCart(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [fetchFoodList, loadedCart]);

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
