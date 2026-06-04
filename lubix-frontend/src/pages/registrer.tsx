import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";

type RegistrationMode = "usuario" | "empresa";

export const Register = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<RegistrationMode>("usuario");

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

    const password = form.password

    const hasMinLength = password.length >= 8
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    const strength = [hasMinLength, hasUpper, hasLower, hasNumber].filter(Boolean).length
    const isPasswordValid = strength === 4

    const getStrengthColor = () => {
        if (strength <= 1) return "bg-red-500"
        if (strength === 2) return "bg-orange-500"
        if (strength === 3) return "bg-yellow-400"
        return "bg-green-500"
    }

    const showPopup = (msg: string, t: "success" | "error") => {
        setMessage(msg)
        setType(t)
        setTimeout(() => {
            setMessage("")
            setType("")
        }, 3000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            showPopup("Las contraseñas no coinciden", "error");
            return;
        }

        if (!isPasswordValid) {
            showPopup("La contraseña no es segura", "error");
            return;
        }

        if (mode === "empresa") {
            if (!form.companyName.trim() || !form.nit.trim() || !form.address.trim() || !form.sector) {
                showPopup("Completa los datos de la empresa", "error");
                return;
            }
        }

        setLoading(true);

        try {
            const payload = mode === "empresa"
                ? {
                    fullName: form.fullName,
                    email: form.email,
                    tell: form.tell,
                    password: form.password,
                    companyName: form.companyName,
                    nit: form.nit,
                    address: form.address,
                    sector: form.sector,
                }
                : form;

            await api.post("/user/register", payload);
            showPopup(
                mode === "empresa" ? "Empresa registrada correctamente" : "Usuario registrado correctamente",
                "success"
            );

            setForm({
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

            setTimeout(() => {
                navigate("/register/VerifyEmailPage");
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showPopup(
                    error.response?.data?.detail || (mode === "empresa" ? "No se pudo registrar la empresa" : "El usuario ya está registrado"),
                    "error"
                );
            } else {
                showPopup("Error desconocido", "error");
            }
        } finally {
            setLoading(false);
        }
    };

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

            {/* Fondo y formulario */}
            <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-sm sm:max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-green-500 text-3xl sm:text-4xl lg:text-5xl font-black drop-shadow-sm mb-2 sm:mb-3 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                            Lubix
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-light tracking-wide">
                            {mode === "empresa" ? "Registra tu empresa" : "Crea tu cuenta gratis"}
                        </p>
                    </div>

                    <div className="mb-4 flex rounded-xl border border-gray-200 bg-gray-50 p-1 shadow-sm">
                        {(["usuario", "empresa"] as RegistrationMode[]).map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setMode(option)}
                                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                                    mode === option
                                        ? "bg-green-500 text-white shadow-md"
                                        : "text-gray-600 hover:bg-white hover:text-green-600"
                                }`}
                            >
                                {option === "usuario" ? "Usuario" : "Empresa"}
                            </button>
                        ))}
                    </div>

                    {/* Formulario */}
                    <form
                        onSubmit={handleRegister}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 space-y-4 sm:space-y-5"
                    >
                        <div>
                            <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                {mode === "empresa" ? "Nombre del contacto *" : "Nombre completo *"}
                            </label>
                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all outline-none"
                                placeholder="Juan Pérez"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                Email *
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all outline-none"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                Teléfono *
                            </label>
                            <input
                                name="tell"
                                value={form.tell}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all outline-none"
                                placeholder="+57 300 123 4567"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                Contraseña *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />

                            {form.password && (
                                <div className="mt-3">
                                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor()}`}
                                            style={{ width: `${(strength / 4) * 100}%` }}
                                        />
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-gray-600">
                                        <span className={hasMinLength ? "text-green-600 font-medium" : "text-gray-500"}>8+ chars</span>
                                        <span className={hasUpper ? "text-green-600 font-medium" : "text-gray-500"}>Mayús</span>
                                        <span className={hasLower ? "text-green-600 font-medium" : "text-gray-500"}>Minús</span>
                                        <span className={hasNumber ? "text-green-600 font-medium" : "text-gray-500"}>Número</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                Confirmar contraseña *
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {mode === "empresa" && (
                            <>
                                <div>
                                    <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                        Nombre de la empresa *
                                    </label>
                                    <input
                                        name="companyName"
                                        value={form.companyName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all outline-none"
                                        placeholder="Lubix S.A.S"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                        NIT *
                                    </label>
                                    <input
                                        name="nit"
                                        value={form.nit}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all outline-none"
                                        placeholder="900123456-7"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                        Dirección *
                                    </label>
                                    <input
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all outline-none"
                                        placeholder="Calle 123 #45-67"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                                        Sector empresarial *
                                    </label>
                                    <select
                                        name="sector"
                                        value={form.sector}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 rounded-xl text-gray-900 text-sm sm:text-base font-medium transition-all outline-none"
                                        required
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="retail">Retail</option>
                                        <option value="tecnologia">Tecnología</option>
                                        <option value="servicios">Servicios</option>
                                        <option value="manufactura">Manufactura</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={!isPasswordValid || loading}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? (mode === "empresa" ? "Registrando empresa..." : "Creando cuenta...") : (mode === "empresa" ? "Registrar empresa" : "Crear cuenta")}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login" className="text-green-600 font-semibold hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
