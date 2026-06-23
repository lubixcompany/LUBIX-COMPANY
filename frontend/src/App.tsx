
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/registrer";
import RecoverPassword from "./pages/reset-password";
import VerificationCode from "./pages/verific-code";
import NewPassword from "./pages/new-password";
import Home from "./pages/Home"; 
import HomeUsuario from "./pages/home-usuario";
import RegistroEmpresa from "./pages/RegistroEmpresa";
import Dashboard_Usuario from "./pages/Dashboard_Usuario";
import Dashboard_Empresa from "./pages/Dashboard_Empresa";


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
      <Route path="/registro-empresa" element={<RegistroEmpresa />} />
      <Route path="/usuario" element={<Dashboard_Usuario />} />
        <Route path="/empresa" element={<Dashboard_Empresa />} />
      
    </Routes>
  );
}

export default App;
