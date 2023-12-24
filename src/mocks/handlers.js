import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return HttpResponse.json([
      {
        name: "Vanilla",
        imagePath: "/images/vanilla.png",
      },
      {
        name: "Chocolate",
        imagePath: "/images/chocolate.png",
      },
    ]);
  }),
];
