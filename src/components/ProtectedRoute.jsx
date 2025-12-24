import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token exists → allow the page
  return children;
}
