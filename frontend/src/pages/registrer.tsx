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

            await api.post("/auth/register-user", payload);
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
                <div className={type === "success" ? "popup-success" : "popup-error"}>
                    <div className="flex items-center gap-2">
                        {type === "success" ? "✅" : "❌"}
                        <span className="font-medium text-sm">{message}</span>
                    </div>
                </div>
            )}

            {/* Contenedor Principal */}
            <div className="page-container flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-sm sm:max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-accent text-3xl sm:text-4xl lg:text-5xl font-black drop-shadow-sm mb-2 sm:mb-3">
                            Lubix
                        </h1>
                        <p className="text-muted text-sm sm:text-base lg:text-lg font-light tracking-wide">
                            {mode === "empresa" ? "Registra tu empresa" : "Crea tu cuenta gratis"}
                        </p>
                    </div>

                    {/* Selector de Modo */}
                    <div className="mb-4 flex rounded-xl border p-1 shadow-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}>
                        {(["usuario", "empresa"] as RegistrationMode[]).map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setMode(option)}
                                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200`}
                                style={{
                                    backgroundColor: mode === option ? "var(--color-btn-primary)" : "transparent",
                                    color: mode === option ? "white" : "var(--color-text)",
                                }}
                            >
                                {option === "usuario" ? "Usuario" : "Empresa"}
                            </button>
                        ))}
                    </div>

                    {/* Formulario */}
                    <form
                        onSubmit={handleRegister}
                        className="card-form space-y-4 sm:space-y-5"
                    >
                        <div>
                            <label className="label-base">
                                {mode === "empresa" ? "Nombre del contacto *" : "Nombre completo *"}
                            </label>
                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                className="input-base"
                                placeholder="Juan Pérez"
                                required
                            />
                        </div>

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
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="label-base">
                                Teléfono *
                            </label>
                            <input
                                name="tell"
                                value={form.tell}
                                onChange={handleChange}
                                className="input-base"
                                placeholder="+57 300 123 4567"
                                required
                            />
                        </div>

                        <div>
                            <label className="label-base">
                                Contraseña *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="input-base"
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
                                    <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-muted">
                                        <span className={hasMinLength ? "text-accent font-medium" : "text-muted"}>8+ chars</span>
                                        <span className={hasUpper ? "text-accent font-medium" : "text-muted"}>Mayús</span>
                                        <span className={hasLower ? "text-accent font-medium" : "text-muted"}>Minús</span>
                                        <span className={hasNumber ? "text-accent font-medium" : "text-muted"}>Número</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="label-base">
                                Confirmar contraseña *
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="input-base"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {mode === "empresa" && (
                            <>
                                <div>
                                    <label className="label-base">
                                        Nombre de la empresa *
                                    </label>
                                    <input
                                        name="companyName"
                                        value={form.companyName}
                                        onChange={handleChange}
                                        className="input-base"
                                        placeholder="Lubix S.A.S"
                                        required
                                    />
                                </div>

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

                                <div>
                                    <label className="label-base">
                                        Dirección *
                                    </label>
                                    <input
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="input-base"
                                        placeholder="Calle 123 #45-67"
                                        required
                                    />
                                </div>

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
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={!isPasswordValid || loading}
                            className="btn-primary"
                        >
                            {loading ? (mode === "empresa" ? "Registrando empresa..." : "Creando cuenta...") : (mode === "empresa" ? "Registrar empresa" : "Crear cuenta")}
                        </button>

                        <p className="text-center text-sm text-muted">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login" className="text-accent font-semibold hover:underline">
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
