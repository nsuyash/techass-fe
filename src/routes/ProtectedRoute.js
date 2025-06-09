import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role: requiredRole, children }) => {
  const { role } = useAuth();
  if (role !== requiredRole) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
