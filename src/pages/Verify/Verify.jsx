import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/storeContext";
import "./Verify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderid");
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const verifyPayment = useCallback(async () => {
    if (!orderId) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      if (response.data.success) {
        navigate("/my-orders");
      } else {
        navigate("/");
      }
    } catch {
      navigate("/");
    }
  }, [navigate, orderId, success, url]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="verify">
      <div className="spinner">

      </div>
    </div>

  )
};

export default Verify;
