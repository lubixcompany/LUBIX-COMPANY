// src/pages/RegisterCompany.tsx
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"


export default function RegistroEmpresa() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    empresaNombre: "",
    nit: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    sector: "",
  })

  const [message, setMessage] = useState("")
  const [type, setType] = useState<"success" | "error" | "">("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const showPopup = (msg: string, t: "success" | "error") => {
    setMessage(msg)
    setType(t)
    setTimeout(() => {
      setMessage("")
      setType("")
    }, 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (form.password !== form.confirmPassword) {
      showPopup("Las contraseñas no coinciden", "error")
      return
    }

    if (!form.password || form.password.length < 8) {
      showPopup("La contraseña debe tener al menos 8 caracteres", "error")
      return
    }

    showPopup("Empresa registrada correctamente", "success")
    setTimeout(() => {
      navigate("/")
    }, 2000)
  }

  return (
    <>
      {/* Popup */}
      {message && (
        <div className={type === "success" ? "popup-success" : "popup-error"}>
          <div className="flex items-center gap-2">
            {type === "success" ? "✅" : "❌"}
            <span className="font-medium text-sm">{message}</span>
          </div>
        </div>
      )}

      {/* Fondo */}
      <div className="page-container flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md relative">
          
          {/* Botón volver atrás */}
          <button
            onClick={() => navigate(-1)}
            className="absolute -top-12 left-0 flex items-center gap-2 text-muted hover:text-accent font-semibold transition-colors duration-200 text-sm sm:text-base"
          >
            <span className="text-xl">←</span> Volver
          </button>

          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8 mt-4">
            <h1 className="text-accent text-3xl sm:text-4xl lg:text-5xl font-black drop-shadow-sm mb-2 sm:mb-3">
              Lubix
            </h1>
            <p className="text-muted text-sm sm:text-base lg:text-lg font-light tracking-wide">
              Registra tu empresa
            </p>
          </div>

          {/* Formulario */}
          <form 
            onSubmit={handleSubmit}
            className="card-form space-y-4 sm:space-y-5"
          >
            
            {/* Nombre de la empresa */}
            <div>
              <label className="label-base">
                Nombre de la empresa *
              </label>
              <input
                name="empresaNombre"
                value={form.empresaNombre}
                onChange={handleChange}
                className="input-base"
                placeholder="Lubix S.A.S"
                required
              />
            </div>

            {/* NIT */}
            <div>
              <label className="label-base">
                NIT *
              </label>
              <input
                name="nit"
                value={form.nit}
                onChange={handleChange}
                className="input-base"
                placeholder="900123456-7"
                required
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="label-base">
                Dirección *
              </label>
              <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                className="input-base"
                placeholder="Calle 123 #45-67"
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="label-base">
                Teléfono *
              </label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="input-base"
                placeholder="+57 300 123 4567"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label-base">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input-base"
                placeholder="empresa@lubix.com"
                required
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="label-base">
                Contraseña *
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="input-base"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="label-base">
                Confirmar contraseña *
              </label>
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

            {/* Sector empresarial */}
            <div>
              <label className="label-base">
                Sector empresarial *
              </label>
              <select 
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className="input-base"
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="retail">Retail</option>
                <option value="tecnologia">Tecnología</option>
                <option value="servicios">Servicios</option>
                <option value="manufactura">Manufactura</option>
              </select>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              className="btn-primary"
            >
              Registrar empresa
            </button>
          </form>

          {/* Link login */}
          <div className="mt-6 pt-5 sm:pt-6 divider text-center">
            <p className="text-muted text-xs sm:text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="text-accent hover:underline font-semibold transition-all duration-200 text-sm sm:text-base"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
