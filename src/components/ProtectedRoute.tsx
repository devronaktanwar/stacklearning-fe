import { FC } from "react";
import { Navigate } from "react-router-dom";

interface lProtectedRouteProps {
  children: any;
}
const ProtectedRoute: FC<lProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
