import Sidebar from "../components/Sidebar"

const Tasks = () => {
  return (
    <div className="flex bg-[#f4f4f5] min-h-screen">
      <Sidebar />

      <main className="ml-[280px] flex-1 p-10">
        <h1 className="text-7xl font-black text-black">
          Task Management
        </h1>

        <p className="text-gray-500 text-2xl mt-2 mb-10">
          Manage your team workflow
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* CARD 1 */}

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-3xl font-bold">
              Build Login UI
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Create authentication screens
            </p>

            <div className="mt-6">
              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-bold">
                In Progress
              </span>
            </div>
          </div>

          {/* CARD 2 */}

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-3xl font-bold">
              MongoDB Setup
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Configure database connection
            </p>

            <div className="mt-6">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-bold">
                Completed
              </span>
            </div>
          </div>

          {/* CARD 3 */}

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-3xl font-bold">
              AI Integration
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Connect Grok/OpenAI APIs
            </p>

            <div className="mt-6">
              <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold">
                Todo
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Tasks