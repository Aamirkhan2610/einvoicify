import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneDisplay(phone: string) {
  return phone.replace(/(\+60)(\d{2})(\d{3})(\d{4})/, "$1 $2-$3 $4");
}
