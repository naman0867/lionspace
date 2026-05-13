import Sidebar from "../components/Sidebar"

const Messages = () => {
  return (
    <div className="flex bg-[#f4f4f5] min-h-screen">
      <Sidebar />

      <main className="ml-[280px] flex-1 p-10">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-7xl font-black text-black">
              Team Messages
            </h1>

            <p className="text-gray-500 text-2xl mt-2">
              Collaborate with your team in real-time
            </p>
          </div>

          <button className="bg-black hover:bg-zinc-800 text-white px-8 py-5 rounded-2xl text-xl font-bold transition">
            New Chat
          </button>
        </div>

        {/* CHAT LAYOUT */}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* CHANNELS */}

          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-3xl font-black mb-6">
              Channels
            </h2>

            <div className="space-y-4">
              <div className="bg-purple-100 border border-purple-300 rounded-2xl p-5">
                <h3 className="text-2xl font-bold text-purple-700">
                  # backend-api
                </h3>

                <p className="text-purple-500 mt-2">
                  API discussions
                </p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-5">
                <h3 className="text-2xl font-bold">
                  # frontend-team
                </h3>

                <p className="text-gray-500 mt-2">
                  React updates
                </p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-5">
                <h3 className="text-2xl font-bold">
                  # deployment
                </h3>

                <p className="text-gray-500 mt-2">
                  CI/CD setup
                </p>
              </div>
            </div>
          </div>

          {/* CHAT AREA */}

          <div className="xl:col-span-3 bg-white rounded-3xl shadow-md flex flex-col">
            {/* CHAT HEADER */}

            <div className="border-b border-gray-200 p-6">
              <h2 className="text-4xl font-black">
                # backend-api
              </h2>

              <p className="text-gray-500 mt-2 text-lg">
                12 members online
              </p>
            </div>

            {/* MESSAGES */}

            <div className="flex-1 p-6 space-y-6 overflow-y-auto min-h-[500px]">
              {/* USER 1 */}

              <div className="flex items-start gap-4">
                <img
                  src="https://i.pravatar.cc/100?img=5"
                  alt="user"
                  className="w-14 h-14 rounded-full"
                />

                <div className="bg-gray-100 rounded-2xl px-6 py-4 max-w-[500px]">
                  <h3 className="text-xl font-bold">
                    Alex Johnson
                  </h3>

                  <p className="text-gray-700 mt-2 text-lg">
                    Backend authentication APIs deployed
                    successfully.
                  </p>

                  <span className="text-gray-400 text-sm mt-3 block">
                    2 min ago
                  </span>
                </div>
              </div>

              {/* USER 2 */}

              <div className="flex justify-end">
                <div className="bg-purple-600 text-white rounded-2xl px-6 py-4 max-w-[500px]">
                  <h3 className="text-xl font-bold text-right">
                    You
                  </h3>

                  <p className="mt-2 text-lg">
                    Great. Frontend integration starts
                    today.
                  </p>

                  <span className="text-purple-200 text-sm mt-3 block text-right">
                    1 min ago
                  </span>
                </div>
              </div>
            </div>

            {/* INPUT */}

            <div className="border-t border-gray-200 p-5 flex gap-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-2xl px-5 py-4 text-lg outline-none"
              />

              <button className="bg-black hover:bg-zinc-800 text-white px-8 rounded-2xl text-lg font-bold transition">
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Messages