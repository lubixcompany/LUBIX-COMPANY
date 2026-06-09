import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";
import type { LoginRequest, LoginResponse } from "../types/auts";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      showMessage("Completa todos los campos", "error");
      return;
    }

    setLoading(true);

    try {
      const payload: LoginRequest = { email: email.trim(), password };
      const response = await api.post<LoginResponse>("/user/login", payload);

      const data = response.data;

      login(data.access_token, {
        id: data.id,
        name: data.Nombre,
        email: data.email,
        role: data.role,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;

      showMessage(`¡Bienvenido ${data.Nombre}!`, "success");

      setTimeout(() => navigate("/"), 1000);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.detail || "Error de login", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Popup superior */}
      {message && (
        <div className={messageType === "success" ? "popup-success" : "popup-error"}>
          <div className="flex items-center gap-1.5">
            {messageType === "success" ? "✅" : "❌"}
            <span className="font-medium text-xs sm:text-sm">{message}</span>
          </div>
        </div>
      )}

      {/* Contenedor Principal */}
      <div className="page-container flex items-center justify-center p-3 sm:p-4">
        
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-4 sm:mb-5">
            <h1 className="text-accent text-2xl sm:text-3xl font-black drop-shadow-sm mb-1">
              Lubix
            </h1>
            <p className="text-muted text-xs sm:text-sm font-light tracking-wide">
              Inicia sesión
            </p>
          </div>

          {/* Formulario */}
          <form 
            onSubmit={handleSubmit} 
            className="card-form space-y-3 sm:space-y-4"
          >
            
            {/* Email */}
            <div className="mb-3 sm:mb-4">
              <label className="label-base">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base"
                placeholder="tu@email.com"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="mb-4 sm:mb-5">
              <label className="label-base">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Iniciando...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>

            
            {/* Links */}
            <div className="pt-4 divider text-center">
              <p className="text-muted text-xs sm:text-sm">
                ¿No tienes cuenta?{' '}
                <Link 
                  to="/register" 
                  className="text-accent hover:underline font-semibold text-xs sm:text-sm transition-colors"
                >
                  Regístrate
                </Link>
              </p>
            </div>
            <div className="pt-4 divider text-center">
              <p className="text-muted text-xs sm:text-sm">
                ¿Olvidaste tu contraseña?{' '}
                <Link 
                  to="/recover" 
                  className="text-accent hover:underline font-semibold text-xs sm:text-sm transition-colors"
                >
                  Recuperar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
  
export default Login;