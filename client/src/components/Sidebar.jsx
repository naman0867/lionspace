const Sidebar = ({ setActivePage }) => {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="w-[240px] h-screen bg-black text-white fixed left-0 top-0 flex flex-col justify-between px-8 py-10 shadow-2xl">
      {/* TOP */}
      <div>
        <h1 className="text-4xl font-bold mb-16 tracking-tight">
          LionSpace
        </h1>

        <div className="flex flex-col gap-8 text-xl font-medium">
          <button
            onClick={() =>
              setActivePage("dashboard")
            }
            className="text-left hover:text-purple-400 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => setActivePage("tasks")}
            className="text-left hover:text-purple-400 transition"
          >
            Tasks
          </button>

          <button
            onClick={() =>
              setActivePage("messages")
            }
            className="text-left hover:text-purple-400 transition"
          >
            Messages
          </button>

          <button
            onClick={() =>
              setActivePage("analytics")
            }
            className="text-left hover:text-purple-400 transition"
          >
            Analytics
          </button>
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 py-3 rounded-xl text-lg font-semibold transition"
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar