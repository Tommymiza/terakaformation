import axios, { isAxiosError } from "axios";
import { storage } from "./storage";

export const API_URL: string =
  import.meta.env.VITE_API_URL ?? import.meta.env.REACT_APP_API ?? "";

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Message d'erreur renvoyé par le backend (`{ error }`), ou un message par défaut. */
export function getErrorMessage(
  error: unknown,
  fallback = "Erreur de connexion!",
): string {
  if (isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error ?? fallback;
  }
  return fallback;
}
