// Main application router
// Defines all routes for the Lubix platform
// Routes include authentication, dashboards, and home pages

import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/registrer";
import RecoverPassword from "./pages/reset-password";
import VerificationCode from "./pages/verific-code";
import NewPassword from "./pages/new-password";
import Home from "./pages/Home";
import HomeUsuario from "./pages/home-usuario";
import HomeEmpresa from "./pages/home-empresa";
import RegistroEmpresa from "./pages/RegistroEmpresa";
import DashboardUsuario from "./pages/dashboard-user";
import DashboardEmpresa from "./pages/dashboard-empresa";
import DashboardAdmin from "./pages/dashboard-admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<RecoverPassword />} />
      <Route path="/register/VerifyEmailPage" element={<VerificationCode />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/registro-empresa" element={<RegistroEmpresa />} />

      {/* User routes */}
      <Route path="/home-usuario" element={<ProtectedRoute roles={["user"]}><HomeUsuario /></ProtectedRoute>} />
      <Route path="/dashboard-usuario" element={<ProtectedRoute roles={["user"]}><DashboardUsuario /></ProtectedRoute>} />

      {/* Company routes */}
      <Route path="/home-empresa" element={<ProtectedRoute roles={["company"]}><HomeEmpresa /></ProtectedRoute>} />
      <Route path="/dashboard-empresa" element={<ProtectedRoute roles={["company"]}><DashboardEmpresa /></ProtectedRoute>} />

      {/* Admin routes */}
      <Route path="/dashboard-admin" element={<ProtectedRoute roles={["admin"]}><DashboardAdmin /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
