import { TaskForm } from "../components/form/TaskForm"
import { Tasks } from "../components/Tasks"

export const Dashboard = () => {
  return (
    <div>
      <h1>Create a task</h1>
      <div className="mb-5">
        <TaskForm />
      </div>
      <h2>Recent tasks</h2>
      <div className="mb-5">
        <Tasks />
      </div>
    </div>
  )
}
