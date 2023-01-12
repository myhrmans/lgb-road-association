import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../common/contexts/AuthContext";

interface ProtectedRoutesProps {
  children?: ReactNode;
}

export const ProtectedRoutes = () => {
  const { user } = UserAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};
