import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ isAuthenticated,child }) => {
  const isAdmin = useSelector((state) => state.role === "admin");
console.log(isAdmin,isAuthenticated);
  if(!isAdmin || !isAuthenticated){
    return <Navigate to="/"/>
  }
  return child
    
};

export default AdminRoute;
