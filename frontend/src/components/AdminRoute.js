import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ child }) => {
  const isAdmin = useSelector((state) => state.auth.role === "admin");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAdmin || !isAuthenticated) {
    return <Navigate to="/" />;
  }
  return child;
};

export default AdminRoute;
