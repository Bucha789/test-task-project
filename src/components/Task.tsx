import { Button, Card } from 'react-bootstrap'
import { useAppDispatch } from '../store/hooks'
import { markAsCompleted, remove } from '../store/slices/tasksSlice'
import { stopGlobalTimer } from '../store/slices/timerSlice'
import { transformTimeToString } from '../utils/format'
import { EditModal } from './modals/EditModal'
import { useState } from 'react'


type Props = {
  description: string
  duration: number
  id: string
  taskType: string
  initializeTimer: () => void
}

export const Task = ({ description, duration, id, taskType, initializeTimer }: Props) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const handleComplete = () => {
    dispatch(markAsCompleted({ id }))
    dispatch(stopGlobalTimer());
    document.title = 'Task completed'
  }
  const handleDelete = () => {
    dispatch(remove({ id }))
  }
  const handleEditTask = () => {
    setShow(true);
  }
  const handleStopTask = () => {
    dispatch(stopGlobalTimer());
  }

  return (
    <Card className={`bg-${taskType}`}>
      <Card.Body>
        <Card.Text className='text-white'>{description}</Card.Text>
        <Card.Text className='text-white'>{transformTimeToString(duration)}</Card.Text>
        <Button onClick={initializeTimer}>
          Start
        </Button>
        <Button onClick={handleStopTask}>
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
