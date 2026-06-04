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
     

      {/* Popup superior */}
      {message && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-3 sm:p-4 rounded-2xl shadow-2xl max-w-sm w-11/12 sm:w-auto mx-2 border transition-all duration-300 ease-out animate-in slide-in-from-top-2 fade-in zoom-in ${
          type === "success" 
            ? "bg-green-100 text-green-800 border-green-300" 
            : "bg-red-100 text-red-800 border-red-300"
        }`}>
          <div className="flex items-center gap-2">
            {type === "success" ? "✅" : "❌"}
            <span className="font-medium text-sm">{message}</span>
          </div>
        </div>
      )}

      {/* FONDO CON ESTILO */}
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md relative">
          
          {/* Botón volver atrás */}
          <button
            onClick={() => navigate(-1)}
            className="absolute -top-12 left-0 flex items-center gap-2 text-gray-600 hover:text-green-600 font-semibold transition-colors duration-200 text-sm sm:text-base"
          >
            <span className="text-xl">←</span> Volver
          </button>

          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8 mt-4">
            <h1 className="text-green-500 text-3xl sm:text-4xl lg:text-5xl font-black drop-shadow-sm mb-2 sm:mb-3 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              Lubix
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-light tracking-wide">
              Registra tu empresa
            </p>
          </div>

          {/* Formulario */}
          <form 
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 space-y-4 sm:space-y-5"
          >
            
            {/* Nombre de la empresa */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                Nombre de la empresa *
              </label>
              <input
                name="empresaNombre"
                value={form.empresaNombre}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 focus:bg-white rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all duration-300 outline-none"
                placeholder="Lubix S.A.S"
                required
              />
            </div>

            {/* NIT */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                NIT *
              </label>
              <input
                name="nit"
                value={form.nit}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 focus:bg-white rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all duration-300 outline-none"
                placeholder="900123456-7"
                required
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                Dirección *
              </label>
              <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 focus:bg-white rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all duration-300 outline-none"
                placeholder="Calle 123 #45-67"
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                Teléfono *
              </label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 focus:bg-white rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all duration-300 outline-none"
                placeholder="+57 300 123 4567"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 focus:bg-white rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all duration-300 outline-none"
                placeholder="empresa@lubix.com"
                required
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                Contraseña *
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 focus:bg-white rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all duration-300 outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                Confirmar contraseña *
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 focus:bg-white rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all duration-300 outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Sector empresarial */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                Sector empresarial *
              </label>
              <select 
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border border-gray-200 hover:border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 focus:bg-white rounded-xl sm:rounded-2xl text-gray-900 text-sm sm:text-base font-medium transition-all duration-300 outline-none"
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
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base shadow-lg hover:shadow-xl active:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 transform"
            >
              Registrar empresa
            </button>
          </form>

          {/* Link login */}
          <div className="mt-6 pt-5 sm:pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-xs sm:text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-all duration-200 text-sm sm:text-base decoration-2 underline-offset-4"
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
