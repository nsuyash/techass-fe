import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ user: requiredRole, children }) => {
  const { user } = useAuth();
  if (user.role !== requiredRole.role) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
