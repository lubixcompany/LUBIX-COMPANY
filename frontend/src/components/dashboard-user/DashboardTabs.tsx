import type { Dispatch, SetStateAction } from "react";

export type Tab = "overview" | "orders" | "saved" | "profile";

interface DashboardTabsProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  orderCount: number;
  savedCount: number;
}

export function DashboardTabs({ activeTab, setActiveTab, orderCount, savedCount }: DashboardTabsProps) {
  const tabs = [
    { id: "overview" as const, label: "Resumen" },
    { id: "orders" as const, label: "Mis Pedidos", badge: orderCount },
    { id: "saved" as const, label: "Guardados", badge: savedCount },
    { id: "profile" as const, label: "Mi Perfil" },
  ];

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
              : "bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700"
          }`}
        >
          {tab.label}
          {tab.badge != null && tab.badge > 0 && (
            <span className={`text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold ${
              activeTab === tab.id ? "bg-white/30 text-white" : "bg-green-500 text-white"
            }`}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
