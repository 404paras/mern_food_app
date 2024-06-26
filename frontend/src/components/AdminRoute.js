import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ isAuthenticated,child }) => {
  const isAdmin = useSelector((state) => state.auth.role === "admin");
  
  console.log(isAdmin)

  if(!isAdmin || !isAuthenticated){
    return <Navigate to="/"/>
  }
  return child
    
};

export default AdminRoute;
