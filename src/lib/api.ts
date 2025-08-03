// src/lib/api.ts

// 💡 Types
export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type Shop = {
  _id: string
  name: string
  description: string
  imageUrl: string
}

export type OrderResponse = {
  _id: string
  status: string
  createdAt: string
  items: CartItem[]
}

export type User = {
  _id: string
  name: string
  phone: string
  token: string
}

export type Product = {
  _id: string
  name: string
  price: number
  imageUrl: string
}

// 🔄 Fetch all shops
export const fetchShops = async (): Promise<Shop[]> => {
  const res = await fetch("/api/shops")
  if (!res.ok) throw new Error("Failed to fetch shops")
  return res.json()
}

// ✅ Create Order
export const createOrder = async (orderData: {
  customerName: string
  customerPhone: string
  deliveryAddress: string
  items: CartItem[]
}): Promise<OrderResponse> => {
  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })

  if (!res.ok) throw new Error("Failed to create order")
  return res.json()
}

// ❌ Deprecated: use createOrder instead
export const postOrder = async (_orderData: unknown): Promise<never> => {
  throw new Error("❌ postOrder is deprecated. Use createOrder() instead.")
}

// 🔐 Login API
export const loginUser = async (credentials: {
  phone: string
  password: string
}): Promise<User> => {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })

  if (!res.ok) throw new Error("Invalid phone or password")
  return res.json()
}

// 🆕 Register API – ✅ Fixed Return Type
export const registerUser = async ({
  name,
  phone,
  password,
}: {
  name: string
  phone: string
  password: string
}): Promise<{ user: User; token: string }> => {
  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, phone, password }),
  })

  if (!res.ok) {
    throw new Error("Registration failed")
  }

  return res.json()
}

// 📦 Get User Orders
export const fetchMyOrders = async (userId: string): Promise<OrderResponse[]> => {
  const res = await fetch(`http://localhost:5000/api/my-orders?userId=${userId}`)

  if (!res.ok) throw new Error("Failed to fetch orders")
  return res.json()
}

// ⭐ Submit Order Rating
export const rateOrder = async ({
  orderId,
  rating,
  token,
}: {
  orderId: string
  rating: number
  token: string
}): Promise<void> => {
  const res = await fetch(`http://localhost:5000/api/orders/${orderId}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating }),
  })

  if (!res.ok) throw new Error("Failed to submit rating")
}

// 💸 Send Tip
export const tipOrder = async ({
  orderId,
  tipAmount,
  token,
}: {
  orderId: string
  tipAmount: number
  token: string
}): Promise<void> => {
  const res = await fetch(`http://localhost:5000/api/orders/${orderId}/tip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tipAmount }),
  })

  if (!res.ok) throw new Error("Failed to send tip")
}

// 🛍️ Fetch products for a specific shop
export const fetchShopProducts = async (shopId: string): Promise<Product[]> => {
  const res = await fetch(`http://localhost:5000/api/products/${shopId}`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}
