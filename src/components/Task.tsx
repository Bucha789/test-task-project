import { Button, Card } from "react-bootstrap"
import { useAppDispatch } from "../store/hooks"
import { markAsCompleted, registerCurrentTask, registerEditingTask, remove, updateCurrentTask } from "../store/slices/tasksSlice"
import { useTimer } from "../hooks/useTimer"
import { transformTimeToString } from "../utils/format"


type Props = {
  description: string
  duration: number
  id: string
  taskType: string
}

export const Task = ({ description, duration, id, taskType }: Props) => {
  const dispatch = useAppDispatch();
  const { start, stop } = useTimer(duration, {
    onChangeTimer: (currentSeconds) => {
      dispatch(updateCurrentTask(currentSeconds))
      document.title = `Running - ${transformTimeToString(currentSeconds)}`
    }
  });
  const backgroundColor = taskType === 'short' ? 'bg-success' : taskType === 'medium' ? 'bg-warning' : 'bg-danger';
  const handleComplete = () => {
    dispatch(markAsCompleted({ id }))
    stop();
    document.title = 'Task completed'
  }
  const handleDelete = () => {
    dispatch(remove({ id }))
  }
  const handleEditTask = () => {
    dispatch(registerEditingTask({ id }))
  }

  const handleStartTask = () => {
    dispatch(registerCurrentTask({ id }))
    start();
  }

  return (
    <Card className={backgroundColor}>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{duration}</Card.Text>
        <Button onClick={handleStartTask}>
          Start
        </Button>
        <Button onClick={stop}>
          Stop
        </Button>
        <Button onClick={handleComplete} variant="primary">Complete</Button>
        <Button onClick={handleDelete} variant="danger">Delete</Button>
        <Button onClick={handleEditTask} variant="warning">Edit</Button>
      </Card.Body>
    </Card>
  )
}
