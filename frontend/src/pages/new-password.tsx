import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";

const NewPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  
  const navigate = useNavigate();

  // ✅ Password strength - DEFINIDO AQUÍ
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  const strength = [hasMinLength, hasUpper, hasLower, hasNumber].filter(Boolean).length;
  const isPasswordValid = strength === 4;
  const passwordsMatch = password === confirmPassword;

  const getStrengthColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showMessage("Ingresa tu email", "error");
      return;
    }
    if (!code.trim()) {
      showMessage("Ingresa el código", "error");
      return;
    }
    if (!password) {
      showMessage("Ingresa nueva contraseña", "error");
      return;
    }
    if (!isPasswordValid) {
      showMessage("Contraseña débil (8+ chars, A, a, 0)", "error");
      return;
    }
    if (!passwordsMatch) {
      showMessage("Las contraseñas no coinciden", "error");
      return;
    }

    setLoading(true);

    try {
      console.log("🔥 Restableciendo:", { email: email.trim(), code: code.trim() });
      
      await api.post("/user/reset-password", {
        email: email.trim(),
        code: code.trim(),
        new_password: password,
      });

      showMessage("¡Contraseña restablecida! 🔐", "success");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err: unknown) {
      console.error("❌ Error reset:", err);
      
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        const errorMsg = errorData?.detail || errorData?.message || "Código inválido";
        showMessage(errorMsg, "error");
      } else {
        showMessage("Error de conexión", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Popup */}
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

      {/* FONDO COMPACTO */}
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-4 sm:mb-5">
            <h1 className="text-green-500 text-2xl sm:text-3xl font-black drop-shadow-sm mb-1 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              Lubix
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm font-light">
              Nueva contraseña
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-lg border border-gray-100 space-y-3">
            
            {/* Email */}
            <div className="mb-3">
              <label className="block text-gray-800 font-semibold mb-1.5 text-xs uppercase tracking-wider text-gray-700">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200/50 rounded-lg text-gray-900 placeholder-gray-500 text-sm font-medium transition-all duration-200 outline-none disabled:opacity-50"
                placeholder="tu@email.com"
                disabled={loading}
              />
            </div>

            {/* Código */}
            <div className="mb-3">
              <label className="block text-gray-800 font-semibold mb-1.5 text-xs uppercase tracking-wider text-gray-700">
                Código *
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200/50 rounded-lg text-gray-900 placeholder-gray-500 text-sm font-medium transition-all duration-200 outline-none disabled:opacity-50 uppercase"
                placeholder="123456"
                maxLength={6}
                disabled={loading}
              />
            </div>

            {/* Nueva contraseña */}
            <div className="mb-3">
              <label className="block text-gray-800 font-semibold mb-1.5 text-xs uppercase tracking-wider text-gray-700">
                Nueva contraseña *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200/50 rounded-lg text-gray-900 placeholder-gray-500 text-sm font-medium transition-all duration-200 outline-none disabled:opacity-50"
                placeholder="••••••••"
                disabled={loading}
              />
              
              {/* ✅ Barra de fuerza CORREGIDA */}
              {password && (
                <div className="mt-2">
                  <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
                    <div
                      className={`h-1 rounded transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${(strength / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirmar */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1.5 text-xs uppercase tracking-wider text-gray-700">
                Confirmar *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2.5 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 text-sm font-medium transition-all duration-200 outline-none disabled:opacity-50 ${
                  passwordsMatch ? "border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200/50" :
                  "border-red-300 hover:border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200/50"
                }`}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading || !isPasswordValid || !passwordsMatch}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl text-sm shadow-md hover:shadow-lg hover:-translate-y-px transition-all duration-200 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                "Restablecer"
              )}
            </button>
          </form>

          {/* Link */}
          <div className="mt-3 pt-3 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-xs">
              ¿Cambiaste de opinión?{' '}
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

export default NewPassword;