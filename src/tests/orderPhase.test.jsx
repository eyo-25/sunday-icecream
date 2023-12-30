import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { expect } from "vitest";

test("order phases for happy path", async () => {
  const user = userEvent.setup();

  // render app
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckBox);

  // find and click order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingHeading).toBeInTheDocument();

  // alternatively...
  // const optionItems = screen.getAllByRole("listitem");
  // const optionItemsText = optionItems.map((item)=> item.textContent)
  // expect(optionItemsText).toEqual(["2 Vanilla", "Cherries"]);

  // accept terms and conditions and click to confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsCheckbox);
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  await user.click(confirmButton);

  // loading test
  const loding = screen.getByText("Loading");
  expect(loding).toBeInTheDocument();

  // post가 완료되어 로딩이 끝나고 메세지가 나타나는지 테스트
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // 로딩이 끝난지 테스트
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingTotal = await screen.findByText("Toppings total: $0.00");
  expect(toppingTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
  unmount();
});

test("topping header is not there", async () => {
  const user = userEvent.setup();
  render(<App />);

  // 주문 단계에서 스쿱만 담기
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);

  // summary phase 인지 test
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  // 토핑헤더가 없는지 테스트
  const toppingHeader = screen.queryByRole("heading", { name: /toppings:/i });
  expect(toppingHeader).not.toBeInTheDocument();
});

test("topping header is exist there", async () => {
  const user = userEvent.setup();
  render(<App />);

  // 주문 단계에서 스쿱만 담기
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesCheckBox);
  expect(cherriesCheckBox).toBeChecked();

  // remove the topping
  await user.click(cherriesCheckBox);
  expect(cherriesCheckBox).not.toBeChecked();

  // summary phase로 넘어가기
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);

  // summary phase 인지 test
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  //스쿱헤더가 있는지 테스트
  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  // 토핑헤더가 있는지 테스트
  const toppingHeader = screen.queryByRole("heading", { name: /toppings:/i });
  expect(toppingHeader).not.toBeInTheDocument();
});
