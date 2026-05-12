import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post(
        "/auth/login",
        formData
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      alert("Login Success")

      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      alert("Login Failed")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          LionSpace Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <button className="w-full bg-black text-white py-3 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login