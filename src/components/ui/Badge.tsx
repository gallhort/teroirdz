import { OrderStatus, BatchStatus, ORDER_STATUS_LABELS, BATCH_STATUS_LABELS } from "@/types";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const classMap: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    ready: "bg-green-100 text-green-800",
    delivered: "bg-gray-100 text-gray-600",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classMap[status]}`}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}

export function BatchStatusBadge({ status }: { status: BatchStatus }) {
  const classMap: Record<BatchStatus, string> = {
    draft: "bg-gray-100 text-gray-600",
    open: "bg-green-100 text-green-800",
    closed: "bg-orange-100 text-orange-800",
    delivered: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classMap[status]}`}>
      {BATCH_STATUS_LABELS[status]}
    </span>
  );
}
