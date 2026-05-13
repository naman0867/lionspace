import { useState } from "react"
import Sidebar from "../components/Sidebar"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Build Login UI",
      description: "Create authentication pages",
      status: "completed",
    },
    {
      id: 2,
      title: "Setup Backend",
      description: "Configure Express server",
      status: "inprogress",
    },
    {
      id: 3,
      title: "MongoDB Integration",
      description: "Connect database and test models",
      status: "todo",
    },
  ])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const productivityData = [
    { day: "Mon", productivity: 30 },
    { day: "Tue", productivity: 45 },
    { day: "Wed", productivity: 60 },
    { day: "Thu", productivity: 77 },
    { day: "Fri", productivity: 33 },
  ]

  const todoCount = tasks.filter((t) => t.status === "todo").length
  const progressCount = tasks.filter(
    (t) => t.status === "inprogress"
  ).length
  const completedCount = tasks.filter(
    (t) => t.status === "completed"
  ).length

  const analyticsData = [
    {
      name: "Completed",
      value: completedCount,
      color: "#22c55e",
    },
    {
      name: "In Progress",
      value: progressCount,
      color: "#eab308",
    },
    {
      name: "Todo",
      value: todoCount,
      color: "#9ca3af",
    },
  ]

  const addTask = () => {
    if (!title || !description) return

    const newTask = {
      id: Date.now(),
      title,
      description,
      status: "todo",
    }

    setTasks([...tasks, newTask])

    setTitle("")
    setDescription("")
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const moveTask = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          className="bg-[#f5f5f7] rounded-2xl p-5 mb-5 border border-gray-200 shadow-sm"
        >
          <h3 className="text-2xl font-bold text-black">
            {task.title}
          </h3>

          <p className="text-gray-600 mt-3 text-lg">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {status !== "todo" && (
              <button
                onClick={() => moveTask(task.id, "todo")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition"
              >
                Todo
              </button>
            )}

            {status !== "inprogress" && (
              <button
                onClick={() =>
                  moveTask(task.id, "inprogress")
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
              >
                In Progress
              </button>
            )}

            {status !== "completed" && (
              <button
                onClick={() =>
                  moveTask(task.id, "completed")
                }
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
              >
                Complete
              </button>
            )}

            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))
  }

  return (
    <>
      <Sidebar />

      <div className="ml-[280px] min-h-screen bg-[#f4f4f5] p-10 overflow-y-auto">
        <h1 className="text-6xl font-black text-black mb-10">
          AI Productivity Dashboard
        </h1>

        {/* TOP STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-gray-500 text-2xl">
              Productivity
            </h2>

            <p className="text-7xl font-black text-blue-500 mt-4">
              33%
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-gray-500 text-2xl">
              Completed
            </h2>

            <p className="text-7xl font-black text-green-500 mt-4">
              {completedCount}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-gray-500 text-2xl">
              Pending
            </h2>

            <p className="text-7xl font-black text-yellow-500 mt-4">
              {todoCount + progressCount}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-gray-500 text-2xl">
              AI Efficiency
            </h2>

            <p className="text-7xl font-black text-purple-500 mt-4">
              94%
            </p>
          </div>
        </div>

        {/* ANALYTICS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-3xl shadow-md p-8 h-[520px]">
            <h2 className="text-5xl font-black mb-8">
              Productivity Trend
            </h2>

            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={productivityData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#8b5cf6"
                  strokeWidth={5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 h-[520px]">
            <h2 className="text-5xl font-black mb-8">
              Task Distribution
            </h2>

            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={analyticsData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={140}
                  label
                >
                  {analyticsData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CREATE TASK */}

        <div className="bg-white rounded-3xl shadow-md p-8 mb-10">
          <h2 className="text-5xl font-black mb-8">
            Create Task
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-5 rounded-2xl border border-gray-300 text-xl outline-none"
            />

            <textarea
              rows="4"
              placeholder="Task Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full p-5 rounded-2xl border border-gray-300 text-xl outline-none"
            />

            <button
              onClick={addTask}
              className="bg-black hover:bg-gray-800 text-white px-10 py-5 rounded-2xl text-xl font-bold transition"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* KANBAN */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl shadow-md p-8 min-h-[500px]">
            <h2 className="text-5xl font-black mb-8 text-gray-700">
              Todo
            </h2>

            {renderTasks("todo")}
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 min-h-[500px]">
            <h2 className="text-5xl font-black mb-8 text-yellow-500">
              In Progress
            </h2>

            {renderTasks("inprogress")}
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 min-h-[500px]">
            <h2 className="text-5xl font-black mb-8 text-green-500">
              Completed
            </h2>

            {renderTasks("completed")}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard