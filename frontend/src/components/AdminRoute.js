import React from "react";
import { Route, Navigate,Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ isAuthenticated,child }) => {
  const isAdmin = useSelector((state) => state.role === "admin");

  if(!isAdmin || !isAuthenticated){
    return <Navigate to="/"/>
  }
  return child
    
};

export default AdminRoute;
