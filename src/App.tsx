import { Outlet } from "react-router-dom"
import { Timer } from "./components/Timer"
import { SideMenu } from "./components/SideMenu"

export const App = () => {
  return (
    <div className="bg-body-tertiary container-fluid main__container">
      <SideMenu />
      <Outlet />
      <div className="fixed-bottom bg-info-subtle">
        <Timer />
      </div>
    </div>
  )
}

