import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPaymentbyId } from "@/api/vendor";
import type { Payment } from "@/types/paymentType";
import PaymentPage from "./PaymentPage";

export default function VoucherRoute() {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    getPaymentbyId(paymentId!).then((res) => {
      setPayment(res.payment);
    });
  }, [paymentId]);

  if (!payment) return <div>Loading...</div>;

  return <PaymentPage payment={payment} />;
}
