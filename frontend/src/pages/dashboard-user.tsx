// Dashboard page for regular users
// Displays user profile, purchase history, and account settings

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NavbarUsuario from "../components/navbaruser";
import Footer from "../components/footer";

interface UserStats {
  totalOrders: number;
  totalSpent: number;
  favoriteItems: number;
}

const DashboardUsuario = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalOrders: 0,
    totalSpent: 0,
    favoriteItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user stats from API
    const loadStats = async () => {
      try {
        // Simulated stats - replace with actual API call
        setStats({
          totalOrders: 12,
          totalSpent: 45800,
          favoriteItems: 8,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (!user) {
    return <div className="text-center p-6">Loading user data...</div>;
  }

  return (
    <div className="page-container">
      <NavbarUsuario />

      {/* Header section with user greeting */}
      <section className="px-8 md:px-16 py-12" style={{ backgroundColor: "var(--color-bg)" }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
          Welcome back, {user.name}
        </h1>
        <p className="text-muted text-lg">Manage your purchases and account settings</p>
      </section>

      {/* User profile card */}
      <section className="px-8 md:px-16 py-12" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="card max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>Account Information</h2>
          </div>
          <div className="space-y-4">
            <div className="pb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
              <p className="text-muted text-sm">Full Name</p>
              <p className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>{user.name}</p>
            </div>
            <div className="pb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
              <p className="text-muted text-sm">Email Address</p>
              <p className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>{user.email}</p>
            </div>
            <div>
              <p className="text-muted text-sm">Account Type</p>
              <p className="text-lg font-semibold capitalize" style={{ color: "var(--color-accent)" }}>{user.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="px-8 md:px-16 py-12">
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-text)" }}>Your Activity</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Total orders card */}
          <div className="card p-8 text-center">
            <div className="text-4xl font-extrabold mb-2" style={{ color: "var(--color-accent)" }}>
              {loading ? "-" : stats.totalOrders}
            </div>
            <p className="text-muted">Total Orders</p>
          </div>

          {/* Total spent card */}
          <div className="card p-8 text-center">
            <div className="text-4xl font-extrabold mb-2" style={{ color: "var(--color-accent)" }}>
              {loading ? "-" : `$${stats.totalSpent.toLocaleString()}`}
            </div>
            <p className="text-muted">Total Spent</p>
          </div>

          {/* Favorite items card */}
          <div className="card p-8 text-center">
            <div className="text-4xl font-extrabold mb-2" style={{ color: "var(--color-accent)" }}>
              {loading ? "-" : stats.favoriteItems}
            </div>
            <p className="text-muted">Favorite Items</p>
          </div>
        </div>
      </section>

      {/* Quick actions section */}
      <section className="px-8 md:px-16 py-12" style={{ backgroundColor: "var(--color-section-bg)" }}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-text)" }}>Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* View orders button */}
          <div className="card p-8 hover:shadow-lg transition-all cursor-pointer">
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>View Orders</h3>
            <p className="text-muted mb-4">Check your order history and tracking information</p>
            <button className="btn-primary w-full">View All Orders</button>
          </div>

          {/* Settings button */}
          <div className="card p-8 hover:shadow-lg transition-all cursor-pointer">
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>Settings</h3>
            <p className="text-muted mb-4">Update your profile and preferences</p>
            <button className="btn-secondary w-full">Go to Settings</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DashboardUsuario;