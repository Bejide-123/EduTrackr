
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
