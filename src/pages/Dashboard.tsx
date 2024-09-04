import { TaskForm } from "../components/form/TaskForm"
import { Tasks } from "../components/Tasks"

export const Dashboard = () => {
  return (
    <div>
      <h1>Create a task</h1>
      <div>
        <TaskForm />
      </div>
      <Tasks />
    </div>
  )
}
