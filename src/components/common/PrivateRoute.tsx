import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
