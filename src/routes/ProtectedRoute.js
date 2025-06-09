import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ user: requiredRole, children }) => {
  const { user } = useAuth();
  if (user !== requiredRole) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
