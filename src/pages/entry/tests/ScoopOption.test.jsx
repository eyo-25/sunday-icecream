import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test("box turn red (is-invalid class test)", async () => {
  const user = userEvent.setup();
  render(<ScoopOption name="Vanilla" imagePath="/images/vanilla.png" />);
  // default 상태는 is-invalid class가 존재하지 않습니다.
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  expect(vanillaInput).not.toHaveClass("is-invalid");

  // 유효하지 않은 개수를 가질때 is-invalid class가 존재합니다.
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // 다시 유효한 개수를 가질때 is-invalid class가 존재하지 않습니다.
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
