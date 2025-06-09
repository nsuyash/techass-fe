import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import LoginPage from "./components/Login";
import ManagerDashboard from "./pages/ManagerDashboard";
import EngineerDashboard from "./pages/EngineerDashboard";
import ProjectForm from "./pages/ProjectForm";
import AssignmentForm from './pages/AssignmentForm';
import ProfilePage from "./pages/ProfilePage";
import Unauthorized from "./pages/Unauthorized";

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return children;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/manager" element={
          <PrivateRoute roles={["manager"]}>
            <ManagerDashboard />
          </PrivateRoute>
        } />
        <Route path="/engineer" element={
          <PrivateRoute roles={["engineer"]}>
            <EngineerDashboard />
          </PrivateRoute>
        } />
        <Route path="/projects/create" element={
          <PrivateRoute roles={["manager"]}>
            <ProjectForm />
          </PrivateRoute>
        } />
        <Route path="/assignments/create" element={
          <PrivateRoute roles={["manager"]}>
            <AssignmentForm />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
