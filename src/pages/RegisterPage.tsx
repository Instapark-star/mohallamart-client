import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useToast } from "../hooks/use-toast"
import { registerUser } from "../lib/api"
import { useAuthStore } from "../store/useAuthStore"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { toast } = useToast()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      return toast({
        title: "⚠️ Missing Fields",
        description: "Please fill in all fields",
      })
    }

    setLoading(true)

    try {
      const userData = await registerUser({ name, phone, password })

      login(userData.user, userData.token) // Ensure user + token passed correctly

      toast({
        title: "✅ Registered Successfully",
        description: "Welcome to MohallaMart!",
      })

      navigate("/my-orders")
    } catch (err) {
      toast({
        title: "❌ Registration Failed",
        description: "User may already exist or server error occurred.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      <div className="max-w-md mx-auto bg-neutral-900 p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <Input
          placeholder="Phone Number"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </Button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default RegisterPage
