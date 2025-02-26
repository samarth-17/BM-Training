import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ element, allowedRole }) => {
  const { state } = useAppContext();
  return state.user && state.user.role === allowedRole ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
