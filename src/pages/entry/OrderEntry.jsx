import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilites";
import Options from "./Options";

function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>
        Grand total: {formatCurrency(totals["scoops"] + totals["toppings"])}
      </h2>
      <Button
        disabled={totals.scoops === 0}
        onClick={() => setOrderPhase("review")}
      >
        Order Sundae!
      </Button>
    </div>
  );
}

export default OrderEntry;
