import type { ReactNode } from "react";

interface EditableFieldProps {
  field: keyof ProfileData;
  label: string;
  value: string;
  icon: ReactNode;
  editingField: string | null;
  tempValue: string;
  onEdit: (field: keyof ProfileData, value: string) => void;
  onSave: (field: keyof ProfileData) => void;
  onCancel: () => void;
  onTempChange: (value: string) => void;
  readonly?: boolean;
}

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  avatarColor: string;
  avatarUrl: string | null;
};

export function EditableField({
  field,
  label,
  value,
  icon,
  editingField,
  tempValue,
  onEdit,
  onSave,
  onCancel,
  onTempChange,
  readonly = false,
}: EditableFieldProps) {
  const isEditing = editingField === field;

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-colors group">
      <div className="text-gray-400 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-xs mb-0.5">{label}</p>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              autoFocus
              type={field === "email" ? "email" : "text"}
              value={tempValue}
              onChange={(e) => onTempChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSave(field);
                if (e.key === "Escape") onCancel();
              }}
              className="flex-1 bg-slate-700 border border-green-500/50 text-white text-sm rounded-lg px-2 py-1 focus:outline-none focus:border-green-400"
            />
            <button onClick={() => onSave(field)} className="text-green-400 hover:text-green-300 transition-colors">
              Guardar
            </button>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-300 transition-colors">
              Cancelar
            </button>
          </div>
        ) : (
          <p className="text-white text-sm font-medium">{value || "—"}</p>
        )}
      </div>
      {!isEditing && !readonly && (
        <button
          onClick={() => onEdit(field, value)}
          className="text-gray-600 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          Editar
        </button>
      )}
    </div>
  );
}
