import type { ReactNode } from "react";

interface EmptyStateCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyStateCard({ icon, title, description, actionLabel, onAction }: EmptyStateCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-16 text-center">
      <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
        {icon}
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-3">{title}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-white text-sm font-semibold transition hover:bg-green-400">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
