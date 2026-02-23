import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Landing from "../pages/Landing";

const RootGate = () => {
  const { user, vendor, loading } = useAuth();

  if (loading) return null;

  if (vendor) return <Navigate to="/vendor/overview" replace />;

  if (user) {
    return <Landing />;   // or your user homepage component
  }
  return <Landing />;
};

export default RootGate;