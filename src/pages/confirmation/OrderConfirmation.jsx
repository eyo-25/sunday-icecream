import axios from "axios";
import { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [isError, setIsError] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => setIsError(true));
  }, []);

  const onClickHandler = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };
  const newOrderButton = (
    <Button onClick={onClickHandler}>Create new order</Button>
  );

  if (isError) {
    return (
      <>
        <AlertBanner />
        {newOrderButton}
      </>
    );
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing sill happen now
        </p>
        {newOrderButton}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
