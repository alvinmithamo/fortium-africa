// Use the production backend URL if in production, otherwise use the Vite environment variable
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://fortium-africa-2.onrender.com' 
  : import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export function apiUrl(path: string) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return `${API_BASE_URL}${path}`;
}
