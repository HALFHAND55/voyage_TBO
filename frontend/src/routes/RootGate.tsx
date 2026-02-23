import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Landing from "../pages/Landing";

const RootGate = () => {
  const { user, vendor, loading } = useAuth();
  console.log("RootGate state:", { user, vendor, loading });

  if (loading) return null;

  if (vendor) return <Navigate to="/vendor/overview" replace />;
  if (user) return <Navigate to="/" replace />;

  return <Landing />;
};

export default RootGate;