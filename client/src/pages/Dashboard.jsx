import { useState } from "react"

import Sidebar from "../components/Sidebar"
import Analytics from "./Analytics"

const Dashboard = () => {
  // ACTIVE PAGE
  const [activePage, setActivePage] =
    useState("dashboard")

  // FORM STATES
  const [title, setTitle] = useState("")
  const [description, setDescription] =
    useState("")

  // TASKS
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Build Landing Page",
      description:
        "Create responsive homepage UI using React",
      status: "todo",
    },

    {
      id: 2,
      title: "Setup Backend",
      description:
        "Develop authentication REST APIs",
      status: "progress",
    },

    {
      id: 3,
      title: "MongoDB Integration",
      description:
        "Connect database and test models",
      status: "completed",
    },
  ])

  // ADD TASK
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

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(
      tasks.filter((task) => task.id !== id)
    )
  }

  // MOVE TASK
  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    )
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar setActivePage={setActivePage} />

      {/* MAIN CONTENT */}
      <div className="ml-[240px] w-full p-8">
        {/* DASHBOARD PAGE */}
        {activePage === "dashboard" && (
          <div>
            {/* HEADING */}
            <h1 className="text-4xl font-bold mb-10">
              Real-Time Kanban Board
            </h1>

            {/* CREATE TASK */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
              <h2 className="text-3xl font-bold mb-6">
                Create Task
              </h2>

              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-4 mb-5 outline-none focus:ring-2 focus:ring-black"
              />

              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-4 h-32 mb-5 outline-none focus:ring-2 focus:ring-black"
              />

              <button
                onClick={addTask}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl transition"
              >
                Add Task
              </button>
            </div>

            {/* AI TASK ASSISTANT */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
              <h2 className="text-3xl font-bold mb-6">
                AI Task Assistant
              </h2>

              <textarea
                placeholder="Example: Build scalable MERN app"
                className="w-full border border-gray-300 rounded-xl p-4 h-28 mb-5 outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl transition">
                Generate Tasks
              </button>
            </div>

            {/* KANBAN BOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* TODO */}
              <div className="bg-gray-200 rounded-2xl p-6 min-h-[450px]">
                <h2 className="text-2xl font-bold mb-6">
                  Todo
                </h2>

                {tasks
                  .filter(
                    (task) => task.status === "todo"
                  )
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-2xl shadow-md p-5 mb-5"
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {task.title}
                      </h3>

                      <p className="text-gray-600 mb-5">
                        {task.description}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            moveTask(
                              task.id,
                              "progress"
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
                        >
                          Start
                        </button>

                        <button
                          onClick={() =>
                            deleteTask(task.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* IN PROGRESS */}
              <div className="bg-gray-200 rounded-2xl p-6 min-h-[450px]">
                <h2 className="text-2xl font-bold mb-6">
                  In Progress
                </h2>

                {tasks
                  .filter(
                    (task) =>
                      task.status === "progress"
                  )
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-2xl shadow-md p-5 mb-5"
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {task.title}
                      </h3>

                      <p className="text-gray-600 mb-5">
                        {task.description}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            moveTask(
                              task.id,
                              "completed"
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() =>
                            moveTask(task.id, "todo")
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* COMPLETED */}
              <div className="bg-gray-200 rounded-2xl p-6 min-h-[450px]">
                <h2 className="text-2xl font-bold mb-6">
                  Completed
                </h2>

                {tasks
                  .filter(
                    (task) =>
                      task.status === "completed"
                  )
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-2xl shadow-md p-5 mb-5"
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {task.title}
                      </h3>

                      <p className="text-gray-600 mb-5">
                        {task.description}
                      </p>

                      <button
                        onClick={() =>
                          deleteTask(task.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white w-full py-3 rounded-xl transition"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* TASKS PAGE */}
        {activePage === "tasks" && (
          <div>
            <h1 className="text-4xl font-bold mb-10">
              Task Management
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <h2 className="text-2xl font-bold mb-3">
                    {task.title}
                  </h2>

                  <p className="text-gray-600 mb-5">
                    {task.description}
                  </p>

                  <div className="mb-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        task.status === "todo"
                          ? "bg-gray-200 text-gray-700"
                          : task.status ===
                            "progress"
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {task.status !==
                      "completed" && (
                      <button
                        onClick={() =>
                          moveTask(
                            task.id,
                            task.status === "todo"
                              ? "progress"
                              : "completed"
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
                      >
                        {task.status === "todo"
                          ? "Start"
                          : "Complete"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES PAGE */}
        {activePage === "messages" && (
          <div>
            <h1 className="text-4xl font-bold mb-10">
              Messages
            </h1>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <p className="text-lg text-gray-600">
                Team collaboration chat feature
                coming soon.
              </p>
            </div>
          </div>
        )}

        {/* ANALYTICS PAGE */}
        {activePage === "analytics" && (
          <Analytics tasks={tasks} />
        )}
      </div>
    </div>
  )
}

export default Dashboard