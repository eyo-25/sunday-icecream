import { describe, expect } from "vitest";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("updates subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // total 가격이 0달러인지 체크
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("updates subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // total 가격이 0 달러인지 체크
  const toppingsSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubTotal).toHaveTextContent("0.00");

  // check box를 하나 클릭했을때 total 가격 테스트
  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckBox);
  expect(toppingsSubTotal).toHaveTextContent("1.50");

  // 두개이상 선택시 total 가격 테스트
  const mnmCheckBox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  await user.click(mnmCheckBox);
  expect(toppingsSubTotal).toHaveTextContent("3.00");

  // 한개를 체크 해제 했을 때 total 가격 테스트
  await user.click(cherriesCheckBox);
  expect(toppingsSubTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {});
  test("grand total updates properly if scoop is added first", () => {});
  test("grand total updates properly if topping is added first", () => {});
  test("grand total updates properly if item is removed", () => {});
});
