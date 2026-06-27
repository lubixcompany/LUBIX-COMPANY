// src/pages/RegisterCompany.tsx
import { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import axios from "axios"

export default function RegistroEmpresa() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    fullName: "",
    empresaNombre: "",
    nit: "",
    nitDV: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [certificate, setCertificate] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [type, setType] = useState<"success" | "error" | "">("")
  const [loading, setLoading] = useState(false)

  const hasMinLength = form.password.length >= 8
  const hasUpper = /[A-Z]/.test(form.password)
  const hasLower = /[a-z]/.test(form.password)
  const hasNumber = /[0-9]/.test(form.password)
  const isPasswordValid = [hasMinLength, hasUpper, hasLower, hasNumber].every(Boolean)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const showPopup = (msg: string, t: "success" | "error") => {
    setMessage(msg)
    setType(t)
    setTimeout(() => { setMessage(""); setType("") }, 4000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      showPopup("Las contrasenas no coinciden", "error")
      return
    }

    if (!isPasswordValid) {
      showPopup("La contrasena debe tener 8+ chars, mayuscula, minuscula y numero", "error")
      return
    }

    if (!certificate) {
      showPopup("Adjunta el certificado de la empresa (PDF o imagen)", "error")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("fullName", form.fullName)
      formData.append("email", form.email)
      formData.append("password", form.password)
      formData.append("tell", form.telefono)
      formData.append("companyName", form.empresaNombre)
      formData.append("companyAddress", form.direccion)
      formData.append("companyNIT", form.nit)
      formData.append("companyNITDV", form.nitDV)
      formData.append("certificate", certificate)

      await api.post("/auth/register-company", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      showPopup("Empresa enviada. El equipo Lubix verificara y activara tu cuenta.", "success")
      setTimeout(() => navigate("/login"), 3000)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail
        let errorMessage = "Error al registrar empresa"
        if (typeof detail === "string") {
          errorMessage = detail
        } else if (Array.isArray(detail)) {
          errorMessage = detail[0]?.msg || "Error de validacion"
        }
        showPopup(errorMessage, "error")
      } else {
        showPopup("Error de conexion", "error")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {message && (
        <div className={type === "success" ? "popup-success" : "popup-error"}>
          <div className="flex items-center gap-2">
            {type === "success" ? "✅" : "❌"}
            <span className="font-medium text-sm">{message}</span>
          </div>
        </div>
      )}

      <div className="page-container flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md relative">

          <button
            onClick={() => navigate(-1)}
            className="absolute -top-12 left-0 flex items-center gap-2 text-muted hover:text-accent font-semibold transition-colors duration-200 text-sm sm:text-base"
          >
            <span className="text-xl">←</span> Volver
          </button>

          <div className="text-center mb-6 sm:mb-8 mt-4">
            <h1 className="text-accent text-3xl sm:text-4xl lg:text-5xl font-black drop-shadow-sm mb-2 sm:mb-3">
              Lubix
            </h1>
            <p className="text-muted text-sm sm:text-base lg:text-lg font-light tracking-wide">
              Registra tu empresa
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card-form space-y-4 sm:space-y-5">

            <div>
              <label className="label-base">Nombre completo (representante) *</label>
              <input name="fullName" value={form.fullName} onChange={handleChange}
                className="input-base" placeholder="Juan Perez" required />
            </div>

            <div>
              <label className="label-base">Nombre de la empresa *</label>
              <input name="empresaNombre" value={form.empresaNombre} onChange={handleChange}
                className="input-base" placeholder="Lubix S.A.S" required />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="label-base">NIT *</label>
                <input name="nit" value={form.nit} onChange={handleChange}
                  className="input-base" placeholder="900123456" required />
              </div>
              <div className="w-20">
                <label className="label-base">DV *</label>
                <input name="nitDV" value={form.nitDV} onChange={handleChange}
                  className="input-base" placeholder="7" maxLength={1} required />
              </div>
            </div>

            <div>
              <label className="label-base">Direccion *</label>
              <input name="direccion" value={form.direccion} onChange={handleChange}
                className="input-base" placeholder="Calle 123 #45-67" required />
            </div>

            <div>
              <label className="label-base">Telefono *</label>
              <input name="telefono" value={form.telefono} onChange={handleChange}
                className="input-base" placeholder="3001234567" required />
            </div>

            <div>
              <label className="label-base">Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                className="input-base" placeholder="empresa@lubix.com" required />
            </div>

            <div>
              <label className="label-base">Contrasena *</label>
              <input name="password" type="password" value={form.password} onChange={handleChange}
                className="input-base" placeholder="••••••••" required />
              <div className="mt-1.5 h-1.5 rounded-full bg-gray-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    [hasMinLength, hasUpper, hasLower, hasNumber].filter(Boolean).length <= 1 ? "bg-red-500 w-1/4" :
                    [hasMinLength, hasUpper, hasLower, hasNumber].filter(Boolean).length === 2 ? "bg-orange-500 w-2/4" :
                    [hasMinLength, hasUpper, hasLower, hasNumber].filter(Boolean).length === 3 ? "bg-yellow-400 w-3/4" :
                    "bg-green-500 w-full"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="label-base">Confirmar contrasena *</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
                className="input-base" placeholder="••••••••" required />
            </div>

            <div>
              <label className="label-base">Certificado de existencia (PDF/imagen) *</label>
              <div
                onClick={() => fileRef.current?.click()}
                className="input-base cursor-pointer flex items-center gap-2 text-muted"
              >
                {certificate ? certificate.name : "Seleccionar archivo"}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => setCertificate(e.target.files?.[0] ?? null)}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Enviando..." : "Registrar empresa"}
            </button>
          </form>

          <div className="mt-6 pt-5 sm:pt-6 divider text-center">
            <p className="text-muted text-xs sm:text-sm">
              Ya tienes cuenta?{" "}
              <Link to="/login" className="text-accent hover:underline font-semibold transition-all duration-200 text-sm sm:text-base">
                Inicia sesion
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
