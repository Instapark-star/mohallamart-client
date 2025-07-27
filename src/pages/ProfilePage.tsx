// src/pages/ProfilePage.tsx
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      toast({
        title: "🔐 Login Required",
        description: "Please log in to view your profile.",
      })
      navigate("/login")
    }
  }, [user, navigate, toast])

  if (!user) return null

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="bg-neutral-900 rounded-2xl p-8 w-full max-w-md shadow-xl space-y-6">
        <h1 className="text-2xl font-semibold text-center">Your Profile</h1>

        <div className="space-y-2 text-center">
          <p className="text-lg font-medium">👤 {user.name}</p>
          <p className="text-gray-400 text-sm">📞 {user.phone}</p>
        </div>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => {
            logout()
            toast({
              title: "🚪 Logged Out",
              description: "You’ve been logged out successfully.",
            })
            navigate("/")
          }}
        >
          Logout
        </Button>
      </div>
    </main>
  )
}

export default ProfilePage
