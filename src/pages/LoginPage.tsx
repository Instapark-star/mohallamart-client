// src/pages/LoginPage.tsx

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginUser } from "../lib/api"
import { useToast } from "../hooks/use-toast"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useAuthStore } from "../store/useAuthStore"

const LoginPage = () => {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleLogin = async () => {
    if (!phone || !password) {
      return toast({
        title: "⚠️ Missing Fields",
        description: "Please fill in both phone and password",
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
      const response = await loginUser({ phone, password })
      const { token, ...user } = response

      login(user, token)

      toast({
        title: "✅ Login Successful",
        description: "Welcome back!",
      })

      navigate("/my-orders")
    } catch (err) {
      toast({
        title: "❌ Login Failed",
        description: "Invalid phone or password",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-16">
      <div className="max-w-md mx-auto bg-neutral-900 p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-semibold text-center">Login to MohallaMart</h1>

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
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-sm text-center text-gray-400">
          New to MohallaMart?{" "}
          <Link to="/register" className="text-white underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}

export default LoginPage
