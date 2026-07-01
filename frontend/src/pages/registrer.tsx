import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import axios from "axios"

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tell: "",
    password: "",
    confirmPassword: "",
  })

  const [message, setMessage] = useState("")
  const [type, setType] = useState<"success" | "error" | "">("")
  const [loading, setLoading] = useState(false)

  const hasMinLength = form.password.length >= 8
  const hasUpper = /[A-Z]/.test(form.password)
  const hasLower = /[a-z]/.test(form.password)
  const hasNumber = /[0-9]/.test(form.password)
  const strength = [hasMinLength, hasUpper, hasLower, hasNumber].filter(Boolean).length
  const isPasswordValid = strength === 4

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setLoading(true)

    try {
      await api.post("/auth/register-user", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        tell: form.tell,
        password: form.password,
      })

      showPopup("Usuario registrado. Revisa tu correo para verificar tu cuenta.", "success")
      setTimeout(() => navigate("/register/VerifyEmailPage"), 2000)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail
        let msg = "Error al registrar usuario"
        if (typeof detail === "string") {
          msg = detail
        } else if (Array.isArray(detail)) {
          msg = detail[0]?.msg || "Error de validacion"
        }
        showPopup(msg, "error")
      } else {
        showPopup("Error de conexion", "error")
      }
    } finally {
      setLoading(false)
    }
  }

  const strengthColor =
    strength <= 1 ? "bg-red-500" :
    strength === 2 ? "bg-orange-500" :
    strength === 3 ? "bg-yellow-400" :
    "bg-green-500"

  return (
    <>
      {message && (
        <div className={type === "success" ? "popup-success" : "popup-error"}>
          <div className="flex items-center gap-2">
            {type === "success" ? "OK" : "ERROR"}
            <span className="font-medium text-sm">{message}</span>
          </div>
        </div>
      )}

      <div className="page-container flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-muted hover:text-accent font-semibold transition-colors text-sm mb-4"
          >
            <span className="text-lg leading-none">&#8592;</span> Volver
          </button>

          <div className="text-center mb-6 sm:mb-8 mt-4">
            <h1 className="text-accent text-3xl sm:text-4xl lg:text-5xl font-black drop-shadow-sm mb-2">
              Lubix
            </h1>
            <p className="text-muted text-sm sm:text-base font-light tracking-wide">
              Crea tu cuenta de usuario
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card-form space-y-4 sm:space-y-5">

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-base">Nombre *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Juan"
                  required
                />
              </div>
              <div>
                <label className="label-base">Apellido *</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Pérez"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-base">Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input-base"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="label-base">Telefono *</label>
              <input
                name="tell"
                value={form.tell}
                onChange={handleChange}
                className="input-base"
                placeholder="3001234567"
                required
              />
            </div>

            <div>
              <label className="label-base">Contrasena *</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="input-base"
                placeholder="••••••••"
                required
              />
              {form.password && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                      style={{ width: `${(strength / 4) * 100}%` }}
                    />
                  </div>
                  <div className="mt-1.5 grid grid-cols-2 gap-1 text-xs text-muted">
                    <span className={hasMinLength ? "text-accent font-medium" : ""}>8+ chars</span>
                    <span className={hasUpper ? "text-accent font-medium" : ""}>Mayus</span>
                    <span className={hasLower ? "text-accent font-medium" : ""}>Minus</span>
                    <span className={hasNumber ? "text-accent font-medium" : ""}>Numero</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="label-base">Confirmar contrasena *</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="input-base"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>


          <div className="mt-3 pt-4 divider text-center">
            <p className="text-muted text-xs sm:text-sm">
              Ya tienes cuenta?{" "}
              <Link to="/login" className="text-accent hover:underline font-semibold">
                Inicia sesion
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
