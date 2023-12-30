import { describe, expect } from "vitest";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";

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

describe("Grand total", () => {
  test("Grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });

  test("Grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    // 초콜릿 스쿱 2개 더하면 grand total은 4.00 달러가 됩니다.
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // 체리 토핑을 체크하면 이전의 4.00 에 1.50달러가 더해서 5.50달러가 됩니다.
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("Grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    // 체리 토핑을 체크하면 1.50달러가 됩니다.
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("1.50");

    // 기존 합계에 초콜릿 스쿱 2개 더하면 grand total은 5.50 달러가 됩니다.
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("Grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    // 스쿱 2개 선택
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    // 스쿱하나 제거
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "1");

    // 스쿱 1개 토핑1개로 3.50 나오는지 테스트
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("3.50");

    // 토핑 제거해서 스쿱의 하나분의 가격만 남았는지 테스트
    await user.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
