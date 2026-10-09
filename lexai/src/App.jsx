import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import DocumentDetails from "./pages/DocumentDetails";
import ContractReview from "./pages/ContractReview";
import RiskAnalysis from "./pages/RiskAnalysis";
import ClauseExtraction from "./pages/ClauseExtraction";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/logout" element={<Logout />} />

      <Route element={<AppLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/documents"
          element={<Documents />}
        />

        <Route
          path="/documents/:id"
          element={<DocumentDetails />}
        />

        <Route
          path="/contract-review/:id"
          element={<ContractReview />}
        />

        <Route
          path="/risk-analysis"
          element={<RiskAnalysis />}
        />

        <Route
          path="/clause-extraction"
          element={<ClauseExtraction />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Route>

    </Routes>
  );
}

export default App;