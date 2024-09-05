import { Container } from "react-bootstrap"
import { CreateTaskForm } from "../components/form/CreateTaskForm"
import { Tasks } from "../components/Tasks"

export const Dashboard = () => {
  return (
    <Container>
      <div className="mb-5">
        <CreateTaskForm />
      </div>
      <h2>Recent tasks</h2>
      <div className="mb-5">
        <Tasks />
      </div>
    </Container>
  )
}
