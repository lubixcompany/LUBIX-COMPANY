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
import ProductDetail from "./pages/ProductDetail";

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

      {/* User routes */}
      <Route path="/home-usuario" element={<HomeUsuario />} />
      <Route path="/dashboard-usuario" element={<DashboardUsuario />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* Company routes */}
      <Route path="/home-empresa" element={<HomeEmpresa />} />
      <Route path="/registro-empresa" element={<RegistroEmpresa />} />
      <Route path="/dashboard-empresa" element={<DashboardEmpresa />} />
    </Routes>
  );
}

export default App;