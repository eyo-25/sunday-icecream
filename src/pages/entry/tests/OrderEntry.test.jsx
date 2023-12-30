import { HttpResponse, http } from "msw";
import { server } from "../../../mocks/server";

import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";

test("handler 에러 테스트 scoops과 toppings 엔드포인트일때", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops"),
    () => {
      return new HttpResponse(null, { status: 500 });
    },
    http.get("http://localhost:3030/toppings"),
    () => {
      return new HttpResponse(null, { status: 500 });
    }
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByText(
    "An unexpected error occurred. Please try again later."
  );
  expect(alerts).toHaveLength(2);
});

test("if no scoop, button is disable", async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={vitest.fn()} />);

  // 기본 상태 테스트
  const scoopSubTotal = screen.getByText("scoops total: $", { exact: false });
  const orderButton = screen.getByRole("button", { name: /order sundae/i });

  expect(scoopSubTotal).toHaveTextContent("0.00");
  expect(orderButton).toBeDisabled();

  // 스쿱이 있을때 total가격과 버튼이 활성화 되어 있는지 확인
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  expect(scoopSubTotal).toHaveTextContent("6.00");
  expect(orderButton).toBeEnabled();

  // 스쿱 모두 0개로 변경하고 버튼이 비활성화 되어 있는지와 총 가격 확인
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "0");
  expect(scoopSubTotal).toHaveTextContent("0.00");
  expect(orderButton).toBeDisabled();

  // 스쿱이 없는 상태에서 옵션만 활성화 되었을때 버튼이 비활성화 되어 있는지 확인
  const cherriesInput = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesInput);

  const toppingSubTotal = screen.getByText("toppings total: $", {
    exact: false,
  });
  expect(toppingSubTotal).toHaveTextContent("1.50");
  expect(orderButton).toBeDisabled();

  // 다시 스쿱을 담았을때 활성화 되는지 테스트
  await user.type(vanillaInput, "1");
  expect(scoopSubTotal).toHaveTextContent("2.00");
  expect(orderButton).toBeEnabled();
});
