import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normaliza un teléfono para href tel:, conservando dígitos y +
export function toTelHref(phone?: string): string {
  const raw = (phone ?? "").toString()
  const normalized = raw.replace(/[^\d+]/g, "")
  return normalized
}
