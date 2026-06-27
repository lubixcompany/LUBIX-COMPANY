import axios from "axios";

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8001",
});

// Interceptor de request: añade el access token si existe
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//  Interceptor de respuesta: refresca el token si expira
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (token expirado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          // Llamar al endpoint de refresh
          const res = await api.post("/auth/refresh", {
            old_refresh_token: refreshToken,
          });

          const newAccessToken = res.data;

          // Guardar nuevo access token
          localStorage.setItem("access_token", newAccessToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

         // Reintentar la petición original
          return api(originalRequest);
          } catch {
            // Si falla el refresh → cerrar sesión
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
          }

                }
    }

    return Promise.reject(error);
  }
);

export default api;
