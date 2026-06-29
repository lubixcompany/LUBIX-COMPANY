import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";

export default function RegisterCompanyPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    tell: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    nit: "",
    address: "",
    sector: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  const password = form.password;
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const strength = [hasMinLength, hasUpper, hasLower, hasNumber].filter(Boolean).length;
  const isPasswordValid = strength === 4;

  const getStrengthColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const showPopup = (msg: string, t: "success" | "error") => {
    setMessage(msg);
    setType(t);
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.tell.trim()) {
      showPopup("Completa tus datos de contacto", "error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showPopup("Las contraseñas no coinciden", "error");
      return;
    }

    if (!isPasswordValid) {
      showPopup("La contraseña no es segura", "error");
      return;
    }

    if (!form.companyName.trim() || !form.nit.trim() || !form.address.trim() || !form.sector) {
      showPopup("Completa los datos de la empresa", "error");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register-company", {
        fullName: form.fullName,
        email: form.email,
        tell: form.tell,
        password: form.password,
        companyName: form.companyName,
        nit: form.nit,
        address: form.address,
        sector: form.sector,
      });

      showPopup("Empresa registrada correctamente", "success");
      setTimeout(() => navigate("/register/VerifyEmailPage"), 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;
        const errorMessage = typeof detail === "string" ? detail : "No se pudo registrar la empresa";
        showPopup(errorMessage, "error");
      } else {
        showPopup("Error desconocido", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {message && (
        <div className={type === "success" ? "popup-success" : "popup-error"}>
          <div className="flex items-center gap-2">
            {type === "success" ? "✅" : "❌"}
            <span className="text-sm font-medium">{message}</span>
          </div>
        </div>
      )}

      <div className="page-container flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-6xl">
          <div className="mb-4 text-center sm:mb-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              <span className="text-lg">←</span> Volver
            </button>
            <h1 className="mb-1 text-2xl font-black text-accent drop-shadow-sm sm:text-3xl">Lubix</h1>
            <p className="text-xs font-light tracking-wide text-muted sm:text-sm">Registra tu empresa en una sola pantalla</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
            <div className="card-form space-y-3 sm:space-y-4">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3 text-left">
                <p className="text-sm font-semibold text-emerald-700">Datos de acceso</p>
                <p className="text-xs text-emerald-600/80">Crea tu cuenta para comenzar a vender en Lubix.</p>
              </div>
              <div>
                <label className="label-base">Nombre del contacto *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} className="input-base" placeholder="Juan Pérez" required />
              </div>
              <div>
                <label className="label-base">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="input-base" placeholder="empresa@lubix.com" required />
              </div>
              <div>
                <label className="label-base">Teléfono *</label>
                <input name="tell" value={form.tell} onChange={handleChange} className="input-base" placeholder="+57 300 123 4567" required />
              </div>
              <div>
                <label className="label-base">Contraseña *</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className="input-base" placeholder="••••••••" required />
                {form.password && (
                  <div className="mt-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor()}`} style={{ width: `${(strength / 4) * 100}%` }} />
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-muted">
                      <span className={hasMinLength ? "font-medium text-accent" : "text-muted"}>8+ chars</span>
                      <span className={hasUpper ? "font-medium text-accent" : "text-muted"}>Mayús</span>
                      <span className={hasLower ? "font-medium text-accent" : "text-muted"}>Minús</span>
                      <span className={hasNumber ? "font-medium text-accent" : "text-muted"}>Número</span>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="label-base">Confirmar contraseña *</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="input-base" placeholder="••••••••" required />
              </div>
            </div>

            <div className="card-form space-y-3 sm:space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left dark:border-slate-700 dark:bg-slate-900/70">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Datos de la empresa</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Completa la información de tu negocio para publicar productos.</p>
              </div>
              <div>
                <label className="label-base">Nombre de la empresa *</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} className="input-base" placeholder="Lubix S.A.S" required />
              </div>
              <div>
                <label className="label-base">NIT *</label>
                <input name="nit" value={form.nit} onChange={handleChange} className="input-base" placeholder="900123456-7" required />
              </div>
              <div>
                <label className="label-base">Dirección *</label>
                <input name="address" value={form.address} onChange={handleChange} className="input-base" placeholder="Calle 123 #45-67" required />
              </div>
              <div>
                <label className="label-base">Sector empresarial *</label>
                <select name="sector" value={form.sector} onChange={handleChange} className="input-base" required>
                  <option value="">Selecciona una opción</option>
                  <option value="retail">Retail</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="servicios">Servicios</option>
                  <option value="manufactura">Manufactura</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? "Registrando empresa..." : "Registrar empresa"}
              </button>

              <p className="pt-2 text-center text-xs text-muted sm:text-sm">
                ¿Ya tienes cuenta? <Link to="/login" className="font-semibold text-accent transition hover:underline">Inicia sesión</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

