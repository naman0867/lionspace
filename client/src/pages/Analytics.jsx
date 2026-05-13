import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const Analytics = ({ tasks }) => {
  // COUNTS
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length

  const progressTasks = tasks.filter(
    (task) => task.status === "progress"
  ).length

  const pendingTasks =
    todoTasks + progressTasks

  const productivity =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0

  // CHART DATA
  const data = [
    {
      name: "Todo",
      value: todoTasks,
      color: "#3B82F6",
    },

    {
      name: "In Progress",
      value: progressTasks,
      color: "#FACC15",
    },

    {
      name: "Completed",
      value: completedTasks,
      color: "#22C55E",
    },
  ]

  return (
    <div>
      {/* HEADING */}
      <h1 className="text-4xl font-bold mb-10">
        Analytics Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md p-7">
          <p className="text-gray-500 text-lg">
            Total Tasks
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {tasks.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-7">
          <p className="text-gray-500 text-lg">
            Completed
          </p>

          <h2 className="text-5xl font-bold mt-3 text-green-500">
            {completedTasks}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-7">
          <p className="text-gray-500 text-lg">
            Pending
          </p>

          <h2 className="text-5xl font-bold mt-3 text-yellow-500">
            {pendingTasks}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-7">
          <p className="text-gray-500 text-lg">
            Productivity
          </p>

          <h2 className="text-5xl font-bold mt-3 text-blue-500">
            {productivity}%
          </h2>
        </div>
      </div>

      {/* CHARTS + ACTIVITY */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* PIE CHART */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8">
            Task Distribution
          </h2>

          <div className="h-[400px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  outerRadius={140}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT TASKS */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8">
            Recent Activity
          </h2>

          <div className="flex flex-col gap-5">
            {tasks
              .slice()
              .reverse()
              .map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-200 rounded-2xl p-5"
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    {task.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {task.description}
                  </p>

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
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics