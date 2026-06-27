import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

interface Stats {
  total_users: number
  total_companies: number
  pending_companies: number
  active_companies: number
}

interface CompanyRow {
  company_id: string
  user_id: string
  companyName: string
  companyNIT: string
  companyAddress: string
  certificate: string | null
  representative: string
  email: string
  tell: string
  isActive: boolean
  verified: boolean
  created_at: string
}

interface UserRow {
  user_id: string
  fullName: string
  email: string
  tell: string
  verified: boolean
  isActive: boolean
  created_at: string
}

type Tab = "overview" | "companies" | "users"

export default function DashboardAdmin() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [tab, setTab] = useState<Tab>("overview")
  const [stats, setStats] = useState<Stats | null>(null)
  const [companies, setCompanies] = useState<CompanyRow[]>([])
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")

  const showMsg = (msg: string, type: "success" | "error") => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(""), 4000)
  }

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [statsRes, companiesRes, usersRes] = await Promise.all([
        api.get<Stats>("/admin/stats"),
        api.get<CompanyRow[]>("/admin/companies"),
        api.get<UserRow[]>("/admin/users"),
      ])
      setStats(statsRes.data)
      setCompanies(companiesRes.data)
      setUsers(usersRes.data)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout()
        navigate("/login")
      }
    } finally {
      setLoading(false)
    }
  }, [logout, navigate])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleActivate = async (userId: string, name: string) => {
    setActionLoading(userId)
    try {
      await api.patch(`/admin/companies/${userId}/activate`)
      showMsg(`Empresa "${name}" activada correctamente`, "success")
      fetchAll()
    } catch {
      showMsg("Error al activar empresa", "error")
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (userId: string, name: string) => {
    setActionLoading(userId + "_reject")
    try {
      await api.patch(`/admin/companies/${userId}/reject`)
      showMsg(`Empresa "${name}" rechazada`, "success")
      fetchAll()
    } catch {
      showMsg("Error al rechazar empresa", "error")
    } finally {
      setActionLoading(null)
    }
  }

  const pendingCompanies = companies.filter(c => !c.isActive)
  const activeCompanies = companies.filter(c => c.isActive)

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Navbar Admin */}
      <nav
        className="sticky top-0 z-50 px-4 sm:px-8 py-3 flex items-center justify-between border-b"
        style={{ backgroundColor: "var(--color-navbar)", borderColor: "var(--color-navbar-border)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-accent text-xl font-black">Lubix</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: "var(--color-accent)", color: "white" }}
          >
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted text-sm hidden sm:block">{user?.email}</span>
          <button
            onClick={() => { logout(); navigate("/login") }}
            className="btn-secondary text-sm px-3 py-1.5"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Popup */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 ${messageType === "success" ? "popup-success" : "popup-error"}`}>
          {messageType === "success" ? "✅" : "❌"} {message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b" style={{ borderColor: "var(--color-border)" }}>
          {(["overview", "companies", "users"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-semibold transition-colors -mb-px border-b-2 ${
                tab === t
                  ? "border-current text-accent"
                  : "border-transparent text-muted hover:text-accent"
              }`}
            >
              {t === "overview" && "📊 Resumen"}
              {t === "companies" && `🏢 Empresas ${pendingCompanies.length > 0 ? `(${pendingCompanies.length} pendientes)` : ""}`}
              {t === "users" && `👤 Usuarios (${users.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--color-accent)", borderTopColor: "transparent" }} />
          </div>
        ) : (
          <>
            {/* OVERVIEW */}
            {tab === "overview" && stats && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
                  Panel de Administración
                </h2>

                {/* Stats cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Usuarios", value: stats.total_users, icon: "👤", color: "var(--color-accent)" },
                    { label: "Empresas totales", value: stats.total_companies, icon: "🏢", color: "#3b82f6" },
                    { label: "Pendientes de aprobación", value: stats.pending_companies, icon: "⏳", color: "#f59e0b" },
                    { label: "Empresas activas", value: stats.active_companies, icon: "✅", color: "#10b981" },
                  ].map(card => (
                    <div key={card.label} className="card p-5">
                      <div className="text-2xl mb-2">{card.icon}</div>
                      <div className="text-3xl font-black mb-1" style={{ color: card.color }}>
                        {card.value}
                      </div>
                      <div className="text-muted text-sm">{card.label}</div>
                    </div>
                  ))}
                </div>

                {/* Pending approvals summary */}
                {pendingCompanies.length > 0 && (
                  <div className="card p-5">
                    <h3 className="font-bold text-lg mb-4" style={{ color: "var(--color-text)" }}>
                      ⏳ Empresas pendientes de aprobación
                    </h3>
                    <div className="space-y-3">
                      {pendingCompanies.slice(0, 5).map(c => (
                        <div key={c.company_id} className="flex items-center justify-between gap-4 p-3 rounded-lg" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm truncate" style={{ color: "var(--color-text)" }}>{c.companyName}</p>
                            <p className="text-muted text-xs">NIT: {c.companyNIT} · {c.representative}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleActivate(c.user_id, c.companyName)}
                              disabled={actionLoading === c.user_id}
                              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-opacity disabled:opacity-50"
                              style={{ backgroundColor: "#10b981", color: "white" }}
                            >
                              {actionLoading === c.user_id ? "..." : "Aprobar"}
                            </button>
                            <button
                              onClick={() => handleReject(c.user_id, c.companyName)}
                              disabled={actionLoading === c.user_id + "_reject"}
                              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-opacity disabled:opacity-50"
                              style={{ backgroundColor: "#ef4444", color: "white" }}
                            >
                              {actionLoading === c.user_id + "_reject" ? "..." : "Rechazar"}
                            </button>
                          </div>
                        </div>
                      ))}
                      {pendingCompanies.length > 5 && (
                        <button onClick={() => setTab("companies")} className="text-accent text-sm hover:underline">
                          Ver todas ({pendingCompanies.length}) →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COMPANIES */}
            {tab === "companies" && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
                  Gestión de Empresas
                </h2>

                {/* Pending */}
                {pendingCompanies.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-base mb-3" style={{ color: "#f59e0b" }}>
                      ⏳ Pendientes de aprobación ({pendingCompanies.length})
                    </h3>
                    <div className="space-y-3">
                      {pendingCompanies.map(c => (
                        <CompanyCard key={c.company_id} company={c} onActivate={handleActivate} onReject={handleReject} actionLoading={actionLoading} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Active */}
                <div>
                  <h3 className="font-semibold text-base mb-3" style={{ color: "#10b981" }}>
                    ✅ Empresas activas ({activeCompanies.length})
                  </h3>
                  {activeCompanies.length === 0 ? (
                    <p className="text-muted text-sm">No hay empresas activas aún.</p>
                  ) : (
                    <div className="space-y-3">
                      {activeCompanies.map(c => (
                        <CompanyCard key={c.company_id} company={c} onActivate={handleActivate} onReject={handleReject} actionLoading={actionLoading} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* USERS */}
            {tab === "users" && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
                  Usuarios registrados ({users.length})
                </h2>
                {users.length === 0 ? (
                  <p className="text-muted text-sm">No hay usuarios registrados.</p>
                ) : (
                  <div className="space-y-2">
                    {users.map(u => (
                      <div key={u.user_id} className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{u.fullName}</p>
                          <p className="text-muted text-xs">{u.email} · {u.tell}</p>
                          <p className="text-muted text-xs">
                            {new Date(u.created_at).toLocaleDateString("es-CO")}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge active={u.verified} label="Verificado" />
                          <Badge active={u.isActive} label="Activo" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function CompanyCard({ company: c, onActivate, onReject, actionLoading }: {
  company: CompanyRow
  onActivate: (userId: string, name: string) => void
  onReject: (userId: string, name: string) => void
  actionLoading: string | null
}) {
  return (
    <div className="card p-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold" style={{ color: "var(--color-text)" }}>{c.companyName}</p>
            <Badge active={c.isActive} label={c.isActive ? "Activa" : "Pendiente"} />
          </div>
          <p className="text-muted text-xs">NIT: {c.companyNIT}-{c.companyAddress}</p>
          <p className="text-muted text-xs">Representante: {c.representative} · {c.email}</p>
          <p className="text-muted text-xs">Tel: {c.tell}</p>
          <p className="text-muted text-xs">
            Registrada: {new Date(c.created_at).toLocaleDateString("es-CO")}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {!c.isActive && (
            <button
              onClick={() => onActivate(c.user_id, c.companyName)}
              disabled={actionLoading === c.user_id}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#10b981", color: "white" }}
            >
              {actionLoading === c.user_id ? "..." : "✅ Aprobar"}
            </button>
          )}
          <button
            onClick={() => onReject(c.user_id, c.companyName)}
            disabled={actionLoading === c.user_id + "_reject"}
            className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-opacity disabled:opacity-50"
            style={{ backgroundColor: "#ef4444", color: "white" }}
          >
            {actionLoading === c.user_id + "_reject" ? "..." : "❌ Rechazar"}
          </button>
        </div>
      </div>
    </div>
  )
}

function Badge({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-semibold"
      style={{
        backgroundColor: active ? "#10b98120" : "#f59e0b20",
        color: active ? "#10b981" : "#f59e0b",
      }}
    >
      {label}
    </span>
  )
}
