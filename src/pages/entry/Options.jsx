import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";

function Options({ optionType }) {
  const [items, setItems] = useState([]);

  // optionType ise "scoops" or "topping"
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => {
        // 에러 결과 핸들링
      });
  }, [optionType]);

  // 널과 토핑옵션이 있을때 대체
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return <Row>{optionItems}</Row>;
}

export default Options;
