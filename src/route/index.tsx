import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Coins from "./Coins";
import Coin from "./Coin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
      },
    ],
  },
]);

export default router;
