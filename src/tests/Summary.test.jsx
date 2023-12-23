import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import SummaryForm from "../pages/summary/SummaryForm";
import userEvent from "@testing-library/user-event";

test("시작 상태 테스트", () => {
  // render
  render(<SummaryForm />);

  // find the button
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  // 체크안되었는지 테스트
  expect(checkbox).not.toBeChecked();

  // 버튼 비활성화 테스트
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  expect(confirmButton).toBeDisabled();
});

test("클릭했을때 버튼 비활성화 테스트", async () => {
  const user = userEvent.setup();

  // render
  render(<SummaryForm />);

  // find the button and confirm button
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  // 클릭 후 체크 되었는지와 버튼 사용 가능한지 테스트
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();

  // 다시 클릭 후 체크가 해제 되고 버튼 사용 비활성화 테스트
  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  // 팝오버는 시작하면 안보이는 상태
  const nullPopover = screen.queryByText(
    /No ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // 팝오버를 마우스 호버하면 보여야한다.
  const termAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termAndConditions);
  const popover = screen.getByText(/No ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // 팝오버는 마우스가 벗어나면 안보여야한다.
  await user.unhover(termAndConditions);
  expect(nullPopover).not.toBeInTheDocument();
});
