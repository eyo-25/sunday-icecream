import { createContext, useContext, useState } from "react";
import { priceItem } from "../constants";

const OrderDetails = createContext();

// provider 안에 있는지 체크하는 커스텀 훅 생성
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetails Provider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // example: { Chocolate: 1, Vanilla: 2 }
    toppings: {}, // example: { "Gummi Bears": 1 }
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    // 상태 복사
    const newOptionCounts = { ...optionCounts };

    // 새로운 정보로 복사본 업데이트
    newOptionCounts[optionType][itemName] = newItemCount;

    // 복사본을 통해 상태 업데이트
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  // 유틸리티 함수 optionCountss state 값으로 부터 total을 구한 값
  function calculateTotal(optionType) {
    // 얻는다 배열의 숫자를 옵션따입에 따른 예를들어 [1,2] 같은
    const countArray = Object.values(optionCounts[optionType]);

    // total the values in the array of counts
    const totalCount = countArray.reduce((total, value) => total + value, 0);

    return totalCount * priceItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
