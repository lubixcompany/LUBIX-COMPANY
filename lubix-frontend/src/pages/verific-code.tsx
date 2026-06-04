import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";
import type { VerifyEmailRequest, VerifyEmailResponse } from "../types/auts";

const VerificationCode: React.FC = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isValidCode = code.every((digit) => digit !== "");

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === "Enter" && isValidCode) {
      handleSubmit(e);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    const pasteArray = paste.slice(0, 6).split("");
    
    const newCode = [...code];
    pasteArray.forEach((digit, i) => {
      if (i < 6) newCode[i] = digit;
    });
    
    setCode(newCode);
  };

  const handleResend = async () => {
    if (!email) {
      showMessage("Ingresa tu email primero", "error");
      return;
    }

    setLoading(true);
    try {
      await api.post("/user/resend-verification", { email });
      showMessage("Nuevo código enviado", "success");
      setCode(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(
          error.response?.data?.detail || "Error al reenviar",
          "error"
        );
      } else {
        showMessage("Error de conexión", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (!email) {
      showMessage("Ingresa tu email", "error");
      return;
    }

    if (fullCode.length !== 6) {
      showMessage("Código incompleto", "error");
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post<VerifyEmailResponse>(
        "/user/verify-email", 
        {
          email,
          code: fullCode
        } as VerifyEmailRequest
      );

      showMessage("¡Verificado!", "success");
      
      setTimeout(() => {
        navigate("/login", {
          state: { 
            email, 
            verified: true,
            token: response.data.data?.token
          }
        });
      }, 1500);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorDetail = error.response?.data;
        
        if (errorDetail?.detail) {
          showMessage(errorDetail.detail, "error");
        } else {
          showMessage("Código inválido", "error");
        }
      } else {
        showMessage("Error de conexión", "error");
      }
      
      setCode(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Popup SUPER COMPACTO */}
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
          
          {/* Logo COMPACTO */}
          <div className="text-center mb-4 sm:mb-5">
            <h1 className="text-green-500 text-2xl sm:text-3xl font-black drop-shadow-sm mb-1 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              Lubix
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm font-light">
              Verifica email
            </p>
          </div>

          {/* Formulario ULTRA COMPACTO */}
          <form 
            onSubmit={handleSubmit} 
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-lg border border-gray-100 space-y-3"
          >
            
            {/* Email */}
            <div className="mb-3">
              <label className="block text-gray-800 font-semibold mb-1.5 text-xs uppercase tracking-wider text-gray-700">
                Email
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

            {/* OTP SUPER COMPACTO */}
            <div onPaste={handlePaste} className="mb-3">
              <label className="block text-gray-800 font-semibold mb-1.5 text-xs uppercase tracking-wider text-gray-700">
                Código
              </label>
              <div className="flex gap-1.5 p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    disabled={loading}
                    className="w-10 h-10 text-lg font-bold bg-white border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 outline-none disabled:opacity-50 flex items-center justify-center"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Ctrl+V para pegar
              </p>
            </div>

            {/* Botón COMPACTO */}
            <button
              type="submit"
              disabled={!isValidCode || loading || !email}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm shadow-md hover:shadow-lg hover:-translate-y-px transition-all duration-200 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verificando
                </>
              ) : (
                "Verificar"
              )}
            </button>
          </form>

          {/* Reenviar COMPACTO */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleResend}
              disabled={loading || !email}
              className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg text-xs font-medium hover:shadow-sm transition-all duration-200 disabled:opacity-50"
            >
              Reenviar
            </button>
          </div>

          {/* Link COMPACTO */}
          <p className="mt-3 text-center">
            <Link 
              to="/register" 
              className="text-green-600 hover:text-green-700 text-xs font-medium hover:underline transition-colors"
            >
              Cambiar email
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default VerificationCode;