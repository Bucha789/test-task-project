import { BrowserRouter, Route, Routes } from "react-router-dom"
import { App } from "../App"
import { Dashboard } from "../pages/Dashboard"
import { Analytics } from "../pages/Analytics"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}