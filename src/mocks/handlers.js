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
  http.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return HttpResponse.json([
      { name: "Cherries", imagePath: "/images/cherries.png" },
      { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
      { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
    ]);
  }),
];
