import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "../components/layout";

// routes
import { publicRoutes, routes } from "./Routes";
import { AuthProtected } from "./AuthProtected";
import { NonAuth } from "./NonAuth";
import { useSelector } from "react-redux";

const Index = () => {
  const { access_token } = useSelector((state) => state.global);
  return (
    <>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => {
            if (route.path === "/login" || route.path === "/register") {
              return (
                <Route
                  path={route.path}
                  element={
                    <NonAuth>
                      {access_token ? (
                        <Navigate to="/" replace={true} />
                      ) : (
                        <Layout>{route.component}</Layout>
                      )}
                    </NonAuth>
                  }
                  key={idx}
                  exact={true}
                />
              );
            }
            return (
              <Route
                path={route.path}
                element={
                  <NonAuth>
                    {" "}
                    <Layout>{route.component}</Layout>
                  </NonAuth>
                }
                key={idx}
                exact={true}
              />
            );
          })}
        </Route>

        <Route>
          {routes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                  <Layout>{route.component}</Layout>
                </AuthProtected>
              }
              key={idx}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default Index;
