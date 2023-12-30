import userEvent from "@testing-library/user-event";
import {
  getByText,
  render,
  screen,
} from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import { expect } from "vitest";

test("서버에서 가져온 각각의 스쿱옵션이 이미지로 표현되는가", async () => {
  render(<Options optionType="scoops" />);
  // 이미지를 찾습니다.
  const scoopsImage = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopsImage).toHaveLength(2);
  // 이미지 대체 텍스트 확인
  const altTexts = scoopsImage.map((item) => item.alt);
  expect(altTexts).toEqual(["Vanilla scoop", "Chocolate scoop"]);
});

test("서버에서 가져온 각각의 토핑옵션이 이미지로 표현되는가", async () => {
  render(<Options optionType="toppings" />);

  //이미지를 찾고 3개를 msw에서 return하는지 테스트
  const toppingImage = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImage).toHaveLength(3);

  // 이미지 대체 텍스트 테스트로 서버로 부터 데이터가 잘 왔는지 테스트
  const altTexts = toppingImage.map((item) => item.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("무효한 스쿱에 대해서는 스쿱 소계에 업데이트 없음", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  const scoopsSubTotal = screen.getByText("scoops total: $", { exact: false });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(scoopsSubTotal).toHaveTextContent("$0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");
  expect(scoopsSubTotal).toHaveTextContent("$0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopsSubTotal).toHaveTextContent("$0.00");
});
