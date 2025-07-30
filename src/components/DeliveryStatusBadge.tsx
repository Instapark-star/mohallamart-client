// src/components/DeliveryStatusBadge.tsx
import { Badge } from "./ui/badge"

type OrderStatus =
  | "placed"
  | "accepted"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "pending"

type DeliveryStatusBadgeProps = {
  status: OrderStatus | string // fallback allowed
}

const statusMap: Record<OrderStatus, { label: string; bg: string }> = {
  placed: { label: "Placed", bg: "bg-blue-600" },
  accepted: { label: "Accepted", bg: "bg-indigo-600" },
  out_for_delivery: { label: "Out for Delivery", bg: "bg-yellow-500 text-black" },
  delivered: { label: "Delivered", bg: "bg-green-600" },
  cancelled: { label: "Cancelled", bg: "bg-red-600" },
  pending: { label: "Pending", bg: "bg-gray-500" },
}

const DeliveryStatusBadge = ({ status }: DeliveryStatusBadgeProps) => {
  const { label, bg } = statusMap[status as OrderStatus] || {
    label: status,
    bg: "bg-neutral-600",
  }

  return (
    <Badge
      variant="outline"
      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${bg}`}
    >
      {label}
    </Badge>
  )
}

export default DeliveryStatusBadge
