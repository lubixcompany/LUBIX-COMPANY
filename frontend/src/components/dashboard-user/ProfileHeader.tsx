import type { ProfileData } from "./types";

interface ProfileHeaderProps {
  profile: ProfileData;
  ordersCount: number;
  savedCount: number;
  onEditProfile: () => void;
}

export function ProfileHeader({ profile, ordersCount, savedCount, onEditProfile }: ProfileHeaderProps) {
  const initials = profile.name
    ? profile.name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl shadow-blue-500/20">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative flex-shrink-0">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
            />
          ) : (
            <div className={`w-24 h-24 bg-gradient-to-br ${profile.avatarColor} rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white/20 select-none`}>
              {initials}
            </div>
          )}
          <button
            onClick={onEditProfile}
            className="absolute bottom-0 right-0 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-colors border border-white/30"
            title="Cambiar foto"
          >
            <span className="text-white text-sm">✎</span>
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{profile.name || "Tu nombre"}</h1>
          <p className="text-blue-100 mb-3 text-sm">{profile.email || "tu@email.com"}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-white/80">
            {profile.memberSince && (
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                Desde {profile.memberSince}
              </span>
            )}
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              Pedidos: {ordersCount}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              Guardados: {savedCount}
            </span>
          </div>
        </div>

        <button
          onClick={onEditProfile}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-colors border border-white/20 text-sm font-medium flex-shrink-0"
        >
          Editar perfil
        </button>
      </div>
    </div>
  );
}
