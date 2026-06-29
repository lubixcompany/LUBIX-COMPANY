
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import RegisterUserPage from "./pages/registrer";
import RegisterCompanyPage from "./pages/RegistroEmpresa";
import RecoverPassword from "./pages/reset-password";
import VerificationCode from "./pages/verific-code";
import NewPassword from "./pages/new-password";
import Home from "./pages/Home";
import HomeUsuario from "./pages/home-usuario";
import HomeEmpresa from "./pages/home-empresa";
import DashboardUsuario from "./pages/dashboard-user";
import DashboardEmpresa from "./pages/dashboard-empresa";
import Cart from "./pages/car";
import SearchPage from "./pages/search-product";
import ProductPage from "./pages/product";
import Checkout from "./pages/checkout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Navigate to="/register/usuario" replace />} />
      <Route path="/register/usuario" element={<RegisterUserPage />} />
      <Route path="/register/empresa" element={<RegisterCompanyPage />} />
      <Route path="/recover" element={<RecoverPassword />} />
      <Route path="/register/VerifyEmailPage" element={<VerificationCode />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* User routes */}
      <Route path="/home-usuario" element={<HomeUsuario />} />
      <Route path="/dashboard-usuario" element={<DashboardUsuario />} />

      {/* Company routes */}
      <Route path="/home-empresa" element={<HomeEmpresa />} />
      <Route path="/registro-empresa" element={<Navigate to="/register/empresa" replace />} />
      <Route path="/dashboard-empresa" element={<DashboardEmpresa />} />
    </Routes>
  );
}

export default App;
