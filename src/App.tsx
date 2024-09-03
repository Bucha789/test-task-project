import { Outlet } from "react-router-dom"
import { Countdown } from "./components/Countdown"
import { SideMenu } from "./components/SideMenu"

export const App = () => {
  return (
    <div className="bg-body-tertiary container-fluid main__container">
      <SideMenu />
      <Outlet />
      <div className="fixed-bottom bg-info-subtle">
        <Countdown />
      </div>
    </div>
  )
}

