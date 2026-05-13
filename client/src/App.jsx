import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#f4f4f5] overflow-hidden">
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App