import { HttpResponse, http } from "msw";
import { server } from "../../../mocks/server";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";

test("주문 페이지의 서버에러 테스트", async () => {
  server.resetHandlers(http.post("http://localhost:3030/order"), () => {
    return new HttpResponse(null, { status: 500 });
  });

  render(<OrderConfirmation />);

  const alerts = await screen.findByRole("alert");
  expect(alerts).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  );
});
