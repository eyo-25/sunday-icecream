import { render, screen } from "@testing-library/react";
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
