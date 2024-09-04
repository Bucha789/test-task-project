import { Button, Card } from "react-bootstrap"
import { useAppDispatch } from "../store/hooks"
import { markAsCompleted, remove } from "../store/slices/tasksSlice"


type Props = {
  description: string
  duration: number
  id: string
}

export const Task = ({ description, duration, id }: Props) => {
  const dispatch = useAppDispatch();
  const handleComplete = () => {
    dispatch(markAsCompleted({ id }))
  }
  const handleDelete = () => {
    dispatch(remove({ id }))
  }
  return (
    <Card>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{duration}</Card.Text>
        <Button onClick={handleComplete} variant="primary">Complete</Button>
        <Button onClick={handleDelete} variant="danger">Delete</Button>
        <Button variant="warning">Edit</Button>
      </Card.Body>
    </Card>
  )
}
