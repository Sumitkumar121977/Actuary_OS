import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import RiskAnalysisPage from "./pages/RiskAnalysisPage";
import KnowledgeAssistantPage from "./pages/KnowledgeAssistantPage";
import ReportsPage from "./pages/ReportsPage";
import FutureSimulatorPage from "./pages/FutureSimulatorPage";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* First screen */}
        <Route path="/" element={<LoginPage />} />

        {/* Register */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/risk-analysis"
          element={
            <ProtectedRoute>
              <RiskAnalysisPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/knowledge-assistant"
          element={
            <ProtectedRoute>
              <KnowledgeAssistantPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/future-simulator"
          element={
            <ProtectedRoute>
              <FutureSimulatorPage />
            </ProtectedRoute>
          }
        />

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <HistoryPage />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;