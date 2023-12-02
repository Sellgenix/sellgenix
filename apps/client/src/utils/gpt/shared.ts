type EmailType =
  | "product_information_request"
  | "order_modification"
  | "order_delivery_address_correction"
  | "order_cancellation_request"
  | "order_return_request"
  | "order_status_request"
  | "order_tracking_request"
  | "order_delivery_issue"
  | "contact_information_correction";

export function prettifyEmailType(type: EmailType) {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
