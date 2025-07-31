// src/pages/RegisterPage.tsx

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useToast } from "../hooks/use-toast"
import { registerUser } from "../lib/api"
import { useAuthStore } from "../store/useAuthStore"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

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

    if (phone.length !== 10) {
      return toast({
        title: "📱 Invalid Phone",
        description: "Phone number must be 10 digits",
      })
    }

    setLoading(true)

    try {
      const { user, token } = await registerUser({ name, phone, password })
      login(user, token)

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
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Phone Number (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
