import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const navigate = useNavigate();

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

    if (!email.trim()) {
      showMessage("Ingresa tu email", "error");
      return;
    }

    setLoading(true);

    try {
      await api.post("/user/forgot-password", {
        email: email.trim(),
      });

      showMessage("Código enviado a tu correo ✅", "success");

      setTimeout(() => {
        navigate("/new-password", { state: { email: email.trim() } });
      }, 1200);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        showMessage(err.response?.data?.detail || "Error enviando el correo", "error");
      } else {
        showMessage("Error de conexión", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Popup superior UNIFICADO */}
      {message && (
        <div className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 p-2.5 sm:p-3 rounded-xl shadow-xl max-w-sm w-[90vw] sm:w-auto mx-2 border transition-all duration-300 animate-in slide-in-from-top-1 fade-in ${
          messageType === "success" 
            ? "bg-green-100 text-green-800 border-green-300" 
            : "bg-red-100 text-red-800 border-red-300"
        }`}>
          <div className="flex items-center gap-1.5">
            {messageType === "success" ? "✅" : "❌"}
            <span className="font-medium text-xs sm:text-sm">{message}</span>
          </div>
        </div>
      )}

      {/* FONDO BLANCO COMPACTO */}
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center p-3 sm:p-4">
        
        <div className="w-full max-w-sm">
          {/* Logo COMPACTO */}
          <div className="text-center mb-4 sm:mb-5">
            <h1 className="text-green-500 text-2xl sm:text-3xl font-black drop-shadow-sm mb-1 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              Lubix
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm font-light tracking-wide">
              Recuperar contraseña
            </p>
          </div>

          {/* Formulario ULTRA COMPACTO */}
          <form 
            onSubmit={handleSubmit} 
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-lg border border-gray-100 space-y-3"
          >
            
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1.5 text-xs uppercase tracking-wider text-gray-700">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200/50 focus:bg-white rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 text-sm font-medium transition-all duration-200 outline-none disabled:opacity-50"
                placeholder="tu@email.com"
                disabled={loading}
                required
              />
            </div>

            {/* Botón COMPACTO */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl text-sm shadow-md hover:shadow-lg hover:-translate-y-px transition-all duration-200 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                "Enviar código"
              )}
            </button>
          </form>

          {/* Link COMPACTO */}
          <div className="mt-3 pt-3 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-xs">
              ¿Recordaste tu contraseña?{' '}
              <Link 
                to="/login" 
                className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoverPassword;