import type { EmailType } from "@sellgenix/ai";

export function prettifyEmailType(type: EmailType) {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
