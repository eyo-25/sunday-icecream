import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";
import { priceItem } from "../../constants";
import { formatCurrency } from "../../utilites";
import { useOrderDetails } from "../../contexts/OrderDetails";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  // optionType ise "scoops" or "topping"
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // 널과 토핑옵션이 있을때 대체
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return (
    <>
      <Row>
        <h1>{title}</h1>
        <p>{formatCurrency(priceItem[optionType])}</p>
        <p>
          {title} total: {formatCurrency(totals[optionType])}
        </p>
        {optionItems}
      </Row>
    </>
  );
}

export default Options;
