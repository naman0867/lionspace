import {
  NavLink,
  useNavigate,
} from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")

    navigate("/")
  }

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Tasks",
      path: "/tasks",
    },
    {
      title: "Messages",
      path: "/messages",
    },
    {
      title: "Analytics",
      path: "/analytics",
    },
  ]

  return (
    <aside className="fixed top-0 left-0 w-[280px] h-screen bg-black text-white flex flex-col justify-between shadow-2xl z-[9999]">
      <div>
        <div className="px-7 py-8 border-b border-zinc-800">
          <h1 className="text-5xl font-black tracking-tight">
            LionSpace
          </h1>

          <p className="text-zinc-400 text-sm mt-2">
            AI Productivity Workspace
          </p>
        </div>

        <nav className="flex flex-col gap-3 p-5 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `w-full px-6 py-5 rounded-2xl text-2xl font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-lg"
                    : "text-white hover:bg-zinc-900"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-5 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 transition-all duration-200 text-white text-2xl font-bold py-5 rounded-2xl"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar