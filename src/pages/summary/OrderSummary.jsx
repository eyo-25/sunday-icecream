import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilites";

function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); // [["Chocolate", 2], ["Vanilla", "1"]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Object.keys(optionCounts.toppings); // ["M&M", "Gummi bears"]
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <ul>{toppingList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <SummaryForm />
    </div>
  );
}

export default OrderSummary;
