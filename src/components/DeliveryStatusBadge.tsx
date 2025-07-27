// src/components/DeliveryStatusBadge.tsx
import { Badge } from "@/components/ui/badge"

type Props = {
  status: string
}

const statusMap: Record<string, { label: string; color: string }> = {
  placed: { label: "Placed", color: "bg-blue-600" },
  accepted: { label: "Accepted", color: "bg-indigo-600" },
  out_for_delivery: { label: "Out for Delivery", color: "bg-yellow-500 text-black" },
  delivered: { label: "Delivered", color: "bg-green-600" },
  cancelled: { label: "Cancelled", color: "bg-red-600" },
  pending: { label: "Pending", color: "bg-gray-500" },
}

const DeliveryStatusBadge = ({ status }: Props) => {
  const { label, color } = statusMap[status] || {
    label: status,
    color: "bg-neutral-600",
  }

  return (
    <Badge className={`text-white px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </Badge>
  )
}

export default DeliveryStatusBadge
