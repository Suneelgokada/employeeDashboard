import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";

const Dashboard = () => <div>Dashboard Page</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
