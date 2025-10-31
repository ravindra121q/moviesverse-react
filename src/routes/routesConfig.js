import { lazy } from "react";

export const routes = {
  public: [
    {
      path: "/",
      component: lazy(() => import("../components/layout/Auth/LoginPage.jsx")),
    },
    {
      path: "/register",
      component: lazy(() => import("../components/layout/Auth/RegisterPage.jsx")),
    },

  ],
  protected: [
    {
      path: "/movies",
      component: lazy(() => import("../pages/Dashboard/Dashboard.jsx")),
    }
  ],
  notFound: {
    path: "*",
    component: lazy(() => import("../components/common/Loading/NotFound.jsx")),
  },
};
