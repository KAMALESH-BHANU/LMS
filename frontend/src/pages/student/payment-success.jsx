import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

const PaymentSuccess = () => {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {

    const memberId = params.get("memberId");

    const confirm = async () => {
      try {
        await API.post(`/api/payments/confirm/${memberId}`);
        alert("Payment Successful ✅");

        navigate("/student/dashboard");

      } catch (err) {
        console.error(err);
      }
    };

    confirm();

  }, []);

  return <h2 className="p-6">Processing Payment...</h2>;
};

export default PaymentSuccess;