
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
      <Route path="/registro-empresa" element={<RegistroEmpresa />} />
      <Route path="/dashboard-usuario" element={<DashboardUsuario />} />
      
    </Routes>
  );
}

export default App;
