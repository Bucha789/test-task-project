import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { App } from "../App"
import { Dashboard } from "../pages/Dashboard"
import { Analytics } from "../pages/Analytics"
//In this demo, I wanted to create multiple pages as a timer/productivity app
//Where there's a place for the timer and tasks and also a place for analytics. 
//If we want to add more pages, or something related with the auth this can be a good start. (I'm not using auth in this demo)
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to='/tasks' />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}