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
      
      await api.post("/auth/reset-password-user", {
        email: email.trim(),
        code: code.trim(),
        new_password: password,
      });

      showMessage("¡Contraseña restablecida! 🔐", "success");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err: unknown) {
      console.error("Error reset:", err);
      
      if (axios.isAxiosError(err)) {
        // Handle different error response formats
        let errorMessage = "Código inválido";
        
        const detail = err.response?.data?.detail;
        
        if (typeof detail === "string") {
          errorMessage = detail;
        } else if (Array.isArray(detail)) {
          errorMessage = detail[0]?.msg || "Error de validación";
        } else if (detail && typeof detail === "object" && "msg" in detail) {
          errorMessage = (detail as { msg: string }).msg;
        }
        
        showMessage(errorMessage, "error");
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
            <p className="text-muted text-xs sm:text-sm font-light">
              Nueva contraseña
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="card-form space-y-3">
            
            {/* Email */}
            <div className="mb-3">
              <label className="label-base">
                Email *
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

            {/* Código */}
            <div className="mb-3">
              <label className="label-base">
                Código *
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="input-base uppercase"
                placeholder="123456"
                maxLength={6}
                disabled={loading}
              />
            </div>

            {/* Nueva contraseña */}
            <div className="mb-3">
              <label className="label-base">
                Nueva contraseña *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base"
                placeholder="••••••••"
                disabled={loading}
              />
              
              {/* Barra de fuerza */}
              {password && (
                <div className="mt-2">
                  <div className="h-1 w-full rounded overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
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
              <label className="label-base">
                Confirmar *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-base"
                placeholder="••••••••"
                disabled={loading}
                style={{
                  borderColor: !passwordsMatch && confirmPassword ? "rgb(239, 68, 68)" : "var(--color-border)"
                }}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading || !isPasswordValid || !passwordsMatch}
              className="btn-primary"
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
          <div className="mt-3 pt-3 divider text-center">
            <p className="text-muted text-xs">
              ¿Cambiaste de opinión?{' '}
              <Link 
                to="/login" 
                className="text-accent hover:underline font-semibold transition-colors"
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