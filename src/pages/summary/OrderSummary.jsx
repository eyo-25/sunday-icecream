import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilites";

function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); // [["Chocolate", 2], ["Vanilla", "1"]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingComponent = () => {
    if (0 >= totals.toppings) return;

    const toppingsArray = Object.keys(optionCounts.toppings); // ["M&M", "Gummi bears"]
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

    return (
      <>
        <ul>{toppingList}</ul>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      </>
    );
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingComponent()}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

export default OrderSummary;
