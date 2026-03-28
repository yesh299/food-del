import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Verify.css";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderid = searchParams.get("orderid");
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId: orderid })
    if (response.data.success) {
      navigate("/MyOrders");
    }
    else {
      navigate("/");
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner">

      </div>
    </div>

  )
};

export default Verify;
