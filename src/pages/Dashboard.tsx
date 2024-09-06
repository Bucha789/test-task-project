import { Container } from "react-bootstrap"
import { CreateTaskForm } from "../components/form/CreateTaskForm"
import { TaskListContainer } from "../components/TasksContainer"

// The Dashboard component is the main component of the application and it pretends to be the main page of the application.
// In the main page it shows the form to create a task and the list of tasks
export const Dashboard = () => {
  return (
    <Container>
      <div className="mb-5">
        <CreateTaskForm />
      </div>
      <div className="mb-5">
        <TaskListContainer />
      </div>
    </Container>
  )
}
