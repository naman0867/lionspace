import Task from "../models/Task.js"

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body

    const task = await Task.create({
      title,
      description,
    })

    req.app.get("io").emit("tasksUpdated")

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()

    res.json(tasks)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)

    req.app.get("io").emit("tasksUpdated")

    res.json({
      message: "Task deleted",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    req.app.get("io").emit("tasksUpdated")

    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}