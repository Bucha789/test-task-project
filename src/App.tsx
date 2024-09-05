import { Outlet } from "react-router-dom"
import { Timer } from "./components/Timer"
import { TabMenu } from "./components/TabMenu"

export const App = () => {
  return (
    <div className="bg-body-tertiary container-fluid main__container">
      <TabMenu />
      <Outlet />
      <div className="fixed-bottom bg-info-subtle">
        <Timer />
      </div>
    </div>
  )
}

