import { Container } from "react-bootstrap"
import { CreateTaskForm } from "../components/form/CreateTaskForm"
import { TaskListContainer } from "../components/TasksContainer"

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
