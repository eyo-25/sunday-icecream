import { render, screen, fireEvent } from "@testing-library/react";
import { expect } from "vitest";
import SummaryForm from "../pages/summary/SummaryForm";

test("시작 상태 테스트", () => {
  // render
  render(<SummaryForm />);

  // find the button
  const checkbox = screen.getByRole("checkbox", {
    id: "terms-and-conditions",
  });

  // 체크안되었는지 테스트
  expect(checkbox).not.toBeChecked();

  // 버튼 비활성화 테스트
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  expect(confirmButton).toBeDisabled();
});

test("클릭했을때 버튼 비활성화 테스트", () => {
  // render
  render(<SummaryForm />);

  // find the button and confirm button
  const checkbox = screen.getByRole("checkbox", {
    id: "terms-and-conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  // 클릭 후 체크 되었는지와 버튼 사용 가능한지 테스트
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();

  // 다시 클릭 후 체크가 해제 되고 버튼 사용 비활성화 테스트
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});
