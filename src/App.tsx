import { Outlet } from "react-router-dom"
import { Timer } from "./components/Timer"
import { TabMenu } from "./components/TabMenu"
import { useEffect } from "react"
import { useAppSelector } from "./store/hooks"

export const App = () => {
  const tasks = useAppSelector(state => state.tasks);
  const timer = useAppSelector(state => state.timer);

  // To persist the tasks and the current task in the local storage
  // We use the beforeunload event to save the data before the page is closed
  // We could use an API to save the data in a server
  useEffect(() => {
    const saveData = () => {
      localStorage.clear()
      localStorage.setItem('addedTasks', JSON.stringify(tasks.addedTasks))
      localStorage.setItem('task', JSON.stringify(timer.task))
    }
    window.addEventListener('beforeunload', saveData)
    return () => {
      window.removeEventListener('beforeunload', saveData)
    }
  }, [tasks, timer])

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

