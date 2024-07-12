import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Coins from "./Coins";
import Coin from "./Coin";
import Price from "./Price";
import Chart from "./Chart";
import NotFound from "./NotFound";

const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: <Coins />,
        },
        {
          path: ":coinId",
          element: <Coin />,
          children: [
            {
              path: "price",
              element: <Price />,
            },
            {
              path: "chart",
              element: <Chart />,
            },
          ],
          errorElement: <NotFound />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
