import { Button, Card } from "react-bootstrap"
import { useAppDispatch } from "../store/hooks"
import { markAsCompleted, registerEditingTask, remove } from "../store/slices/tasksSlice"


type Props = {
  description: string
  duration: number
  id: string
  taskType: string
}

export const Task = ({ description, duration, id, taskType }: Props) => {
  const dispatch = useAppDispatch();
  const backgroundColor = taskType === 'short' ? 'bg-success' : taskType === 'medium' ? 'bg-warning' : 'bg-danger';
  const handleComplete = () => {
    dispatch(markAsCompleted({ id }))
  }
  const handleDelete = () => {
    dispatch(remove({ id }))
  }
  const handleEditTask = () => {
    dispatch(registerEditingTask({ id }))
  }
  return (
    <Card className={backgroundColor}>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{duration}</Card.Text>
        <Button onClick={handleComplete} variant="primary">Complete</Button>
        <Button onClick={handleDelete} variant="danger">Delete</Button>
        <Button onClick={handleEditTask} variant="warning">Edit</Button>
      </Card.Body>
    </Card>
  )
}
