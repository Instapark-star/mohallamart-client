// src/lib/api.ts

// 🔄 Fetch all shops from backend
export const fetchShops = async () => {
  try {
    const res = await fetch("/api/shops");
    if (!res.ok) throw new Error("Failed to fetch shops");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// 🆕 Create Order (used in CheckoutPage.tsx)
export const createOrder = async (orderData: {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}) => {
  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) throw new Error("Failed to create order");

  return await res.json();
};

// ❌ Deprecated: use createOrder instead
export const postOrder = async (orderData: any) => {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error("Failed to place order");

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// 🔐 Login API
export async function loginUser(credentials: {
  phone: string
  password: string
}) {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Invalid phone or password");

  return await res.json();
}

// 🆕 Register API
export async function registerUser(userData: {
  name: string
  phone: string
  password: string
}) {
  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("Failed to register user");

  return await res.json();
}

// ✅ Updated: Fetch My Orders using userId
export async function fetchMyOrders(userId: string) {
  const res = await fetch(`http://localhost:5000/api/my-orders?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return await res.json();
}
