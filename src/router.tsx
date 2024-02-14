/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from "react-router-dom";

import {
  AuthRoot,
  PasswordResetPage,
  SignInPage,
  SignUpPage,
} from "@/features/auth";
import { HomePage } from "@/features/misc";

import Root from "./features/application/routes/Root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <AuthRoot />,
        path: "auth",
        children: [
          {
            path: "sign-in",
            element: <SignInPage />,
          },
          {
            path: "sign-up",
            element: <SignUpPage />,
          },
          {
            path: "password-reset",
            element: <PasswordResetPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
