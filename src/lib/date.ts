import { format, formatDistanceToNow, isPast } from "date-fns";
import { fr } from "date-fns/locale";

export function formatDateFr(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return format(new Date(d), "d MMMM yyyy", { locale: fr });
}

export function formatDateTimeFr(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return format(new Date(d), "d MMMM yyyy 'à' HH'h'mm", { locale: fr });
}

export function formatShortDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return format(new Date(d), "dd/MM/yyyy", { locale: fr });
}

export function timeFromNow(d: Date | string): string {
  return formatDistanceToNow(new Date(d), { locale: fr, addSuffix: true });
}

export function isExpired(d: Date | string | null | undefined): boolean {
  if (!d) return false;
  return isPast(new Date(d));
}
