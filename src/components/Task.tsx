import { Button, Card } from 'react-bootstrap'
import { useAppDispatch } from '../store/hooks'
import { markAsCompleted, registerCurrentTask, remove, updateCurrentTask } from '../store/slices/tasksSlice'
import { useTimer } from '../hooks/useTimer'
import { transformTimeToString } from '../utils/format'
import { EditModal } from './modals/EditModal'
import { useState } from 'react'


type Props = {
  description: string
  duration: number
  id: string
  taskType: string
}

export const Task = ({ description, duration, id, taskType }: Props) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { start, stop } = useTimer(duration, {
    onChangeTimer: (currentSeconds) => {
      dispatch(updateCurrentTask(currentSeconds))
      document.title = `Running - ${transformTimeToString(currentSeconds)}`
    },
    playSound: true
  });
  const handleComplete = () => {
    dispatch(markAsCompleted({ id }))
    stop();
    document.title = 'Task completed'
  }
  const handleDelete = () => {
    dispatch(remove({ id }))
  }
  const handleEditTask = () => {
    setShow(true);
  }

  const handleStartTask = () => {
    dispatch(registerCurrentTask({ id }))
    start();
  }

  return (
    <Card className={`bg-${taskType}`}>
      <Card.Body>
        <Card.Text className='text-white'>{description}</Card.Text>
        <Card.Text className='text-white'>{transformTimeToString(duration)}</Card.Text>
        <Button onClick={handleStartTask}>
          Start
        </Button>
        <Button onClick={stop}>
          Stop
        </Button>
        <Button onClick={handleComplete} variant='primary'>Complete</Button>
        <Button onClick={handleDelete} variant='danger'>Delete</Button>
        <Button onClick={handleEditTask} variant='warning'>Edit</Button>
      </Card.Body>
      <EditModal
        taskId={id} 
        show={show}
        handleClose={() => {setShow(false)}}
      />
    </Card>
  )
}
