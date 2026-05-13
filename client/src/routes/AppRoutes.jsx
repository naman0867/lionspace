import { Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import Tasks from "../pages/Tasks"
import Messages from "../pages/Messages"
import Analytics from "../pages/Analytics"

const AppRoutes = () => {
  return (
    <Routes>
      {/* DEFAULT */}

      <Route
        path="/"
        element={<Navigate to="/dashboard" />}
      />

      {/* PAGES */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/tasks"
        element={<Tasks />}
      />

      <Route
        path="/messages"
        element={<Messages />}
      />

      <Route
        path="/analytics"
        element={<Analytics />}
      />
    </Routes>
  )
}

export default AppRoutes