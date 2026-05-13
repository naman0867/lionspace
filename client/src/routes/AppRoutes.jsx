import { Routes, Route, Navigate } from "react-router-dom"

import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Analytics from "../pages/Analytics"

function AppRoutes() {
  const token = localStorage.getItem("token")

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" />}
      />

      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/" />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/analytics"
        element={token ? <Analytics /> : <Navigate to="/login" />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} />}
      />
    </Routes>
  )
}

export default AppRoutes