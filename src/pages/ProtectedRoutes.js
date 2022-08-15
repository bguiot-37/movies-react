// *************************
// Middleware - protected routes
// *************************

import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useUserAuth();
  // console.log("user : ", user);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
