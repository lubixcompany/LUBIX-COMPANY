
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import RecoverPassword from "./pages/reset-password";
import VerificationCode from "./pages/verific-code";
import NewPassword from "./pages/new-password";
import Home from "./pages/Home"; 
import HomeUsuario from "./pages/home-usuario";
import HomeEmpresa from "./pages/home-empresa";
import Dashboard from "./pages/dashboard-empresa";
import DashboardUsuario from "./pages/dashboard-usuario";
import BuscarProducto from "./pages/buscar-producto";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<RecoverPassword />} />
      <Route path="/register/VerifyEmailPage" element={<VerificationCode />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/home-usuario" element={<HomeUsuario />} />
      <Route path="/home-empresa" element={<HomeEmpresa />} />
      <Route path="/dashboard-empresa" element={<Dashboard/>} />
      <Route path="/dashboard-usuario" element={<DashboardUsuario/>} />
      <Route path="/buscar" element={<BuscarProducto/>} />
    </Routes>
  );
}

export default App;
