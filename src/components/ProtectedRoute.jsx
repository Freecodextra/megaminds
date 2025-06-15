import { useAppContext } from "../contexts/AppContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

function ProtectedRoute({ children }) {
  const { user, userLoading } = useAppContext();

  if (userLoading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;