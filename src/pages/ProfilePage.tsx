// src/pages/ProfilePage.tsx

import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>You are not logged in.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      <div className="max-w-md mx-auto bg-neutral-900 p-6 rounded-2xl shadow-lg space-y-6 text-center">
        <h1 className="text-2xl font-semibold">👤 Profile</h1>

        <p className="text-lg">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> {user.phone}
        </p>

        <Button onClick={handleLogout} className="w-full mt-6">
          🚪 Logout
        </Button>
      </div>
    </main>
  )
}

export default ProfilePage
