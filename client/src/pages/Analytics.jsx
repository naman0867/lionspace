import Sidebar from "../components/Sidebar"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const Analytics = () => {
  const productivityData = [
    { day: "Mon", productivity: 30 },
    { day: "Tue", productivity: 45 },
    { day: "Wed", productivity: 60 },
    { day: "Thu", productivity: 77 },
    { day: "Fri", productivity: 33 },
  ]

  const taskData = [
    {
      name: "Completed",
      value: 1,
      color: "#22c55e",
    },
    {
      name: "In Progress",
      value: 1,
      color: "#eab308",
    },
    {
      name: "Todo",
      value: 1,
      color: "#9ca3af",
    },
  ]

  return (
    <div className="flex bg-[#f4f4f5] min-h-screen">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="ml-[280px] flex-1 p-10 overflow-x-hidden">
        <h1 className="text-7xl font-black text-black">
          Advanced Analytics
        </h1>

        <p className="text-gray-500 text-2xl mt-2 mb-10">
          AI-powered productivity insights
        </p>

        {/* STATS */}

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
              1
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-gray-500 text-2xl">
              Pending
            </h2>

            <p className="text-7xl font-black text-yellow-500 mt-4">
              2
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

        {/* CHARTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* LINE CHART */}

          <div className="bg-white rounded-3xl shadow-md p-8 h-[550px]">
            <h2 className="text-5xl font-black mb-10">
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

          {/* PIE CHART */}

          <div className="bg-white rounded-3xl shadow-md p-8 h-[550px]">
            <h2 className="text-5xl font-black mb-10">
              Task Distribution
            </h2>

            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={taskData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={140}
                  label
                >
                  {taskData.map((entry, index) => (
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
      </main>
    </div>
  )
}

export default Analytics