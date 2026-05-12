import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import api from "../services/api"
import socket from "../services/socket"

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd"

const Dashboard = () => {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [aiPrompt, setAiPrompt] = useState("")
  const [aiResult, setAiResult] = useState("")

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks")

      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()

    socket.on("tasksUpdated", () => {
      fetchTasks()
    })

    return () => {
      socket.off("tasksUpdated")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")

    navigate("/")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/tasks", formData)

      fetchTasks()

      setFormData({
        title: "",
        description: "",
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)

      fetchTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, {
        status,
      })

      fetchTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const onDragEnd = async (result) => {
    if (!result.destination) return

    const taskId = result.draggableId
    const newStatus = result.destination.droppableId

    await updateStatus(taskId, newStatus)
  }

  const generateAI = async () => {
    try {
      const res = await api.post(
        "/ai/generate",
        {
          prompt: aiPrompt,
        }
      )

      setAiResult(res.data.result)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = {
    todo: tasks.filter(
      (task) => task.status === "todo"
    ),

    "in-progress": tasks.filter(
      (task) => task.status === "in-progress"
    ),

    completed: tasks.filter(
      (task) => task.status === "completed"
    ),
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold">
          LionSpace
        </h1>

        <ul className="mt-8 space-y-4">
          <li>Dashboard</li>
          <li>Tasks</li>
          <li>Messages</li>
          <li>Analytics</li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 bg-gray-100 overflow-x-auto">
        <h2 className="text-3xl font-bold mb-8">
          Real-Time Kanban Board
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">
            Create Task
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <button className="bg-black text-white px-6 py-3 rounded">
            Add Task
          </button>
        </form>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-2xl font-bold mb-4">
            AI Task Assistant
          </h3>

          <textarea
            placeholder="Example: Build scalable MERN app"
            value={aiPrompt}
            onChange={(e) =>
              setAiPrompt(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <button
            onClick={generateAI}
            className="bg-purple-600 text-white px-6 py-3 rounded"
          >
            Generate Tasks
          </button>

          {aiResult && (
            <div className="mt-6 bg-gray-100 p-4 rounded">
              <pre className="whitespace-pre-wrap">
                {aiResult}
              </pre>
            </div>
          )}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(columns).map(
              ([columnId, columnTasks]) => (
                <Droppable
                  droppableId={columnId}
                  key={columnId}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-200 p-4 rounded-xl min-h-[500px]"
                    >
                      <h3 className="text-2xl font-bold mb-4 capitalize">
                        {columnId}
                      </h3>

                      {columnTasks.map(
                        (task, index) => (
                          <Draggable
                            draggableId={task._id}
                            index={index}
                            key={task._id}
                          >
                            {(provided) => (
                              <div
                                ref={
                                  provided.innerRef
                                }
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-4 rounded-xl shadow mb-4"
                              >
                                <h4 className="text-xl font-bold">
                                  {task.title}
                                </h4>

                                <p className="mt-2 text-gray-600">
                                  {
                                    task.description
                                  }
                                </p>

                                <button
                                  onClick={() =>
                                    handleDelete(
                                      task._id
                                    )
                                  }
                                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )
            )}
          </div>
        </DragDropContext>
      </main>
    </div>
  )
}

export default Dashboard