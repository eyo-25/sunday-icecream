import { HttpResponse, http } from "msw";
import { server } from "../../../mocks/server";

import { logRoles, render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { expect } from "vitest";

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

  const { container } = render(<OrderEntry />);

  const alerts = await screen.findAllByText(
    "An unexpected error occurred. Please try again later."
  );
  expect(alerts).toHaveLength(2);

  logRoles(container);
});

test("my test 2", () => {});
test("my test 3", () => {});
