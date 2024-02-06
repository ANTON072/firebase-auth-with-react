import { createBrowserRouter } from "react-router-dom";

import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    element: <Root />,
    path: "/",
  },
]);

export default router;
