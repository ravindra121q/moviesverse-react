import React, { Suspense, useContext } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { routes } from "./routesConfig";
import { LoadingSpinner } from "../components/common/Loading/LoadingSpinner";
import { Routes, Route } from "../lib/exports";
import { AuthContext } from "../context/AuthContext";
import ErrorBoundary from "../components/common/ErrorBoundary";
import TestError from "../components/common/TestError";

const AppRoutes = () => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);

  if (authLoading) return <LoadingSpinner />;

  const renderRoutes = (routeList, isProtected = false) =>
    routeList.map(({ path, component: Component }) => (
      <Route
        key={path}
        path={path}
        element={
          isProtected ? (
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Component />
            </ProtectedRoute>
          ) : (
            <Component />
          )
        }
      />
    ));

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>

          {renderRoutes(routes.public)}
          {renderRoutes(routes.protected, true)}
          <Route path="/test-error" element={<TestError />} />
          <Route path="*" element={<routes.notFound.component />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
