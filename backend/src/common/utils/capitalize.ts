export function capitalize(value?: string | null) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}