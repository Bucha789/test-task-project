import { useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { BsCheck, BsPlayFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { markAsCompleted, remove } from '../store/slices/tasksSlice'
import { transformTimeToString } from '../utils/format'
import { EditModal } from './modals/EditModal'
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { cleanTaskInTimer, stopGlobalTimer } from '../store/slices/timerSlice';
import { AlertModal } from './modals/AlertModal';


type Props = {
  description: string
  duration: number
  id: string
  taskType: string
  initializeTimer: () => void
  viewType?: 'list' | 'card'
  completed?: boolean
}

export const TaskItem = ({ description, duration, id, taskType, initializeTimer, viewType, completed }: Props) => {
  const currentTask = useAppSelector(state => state.timer.task);
  const dispatch = useAppDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const directionSelected = viewType === 'card' ? 'vertical' : 'horizontal';


  const handleStartTimer = () => {
    if (currentTask && currentTask.id !== id) {
      return setShowAlertModal(true);
    }
    initializeTimer();
  }

  const handleDelete = () => {
    dispatch(remove({ id }))
  }
  const handleEditTask = () => {
    setShowEditModal(true);
  }
  const handleCompleteTask = () => {
    if (currentTask) {
      dispatch(markAsCompleted({ id: currentTask?.id }));
      dispatch(stopGlobalTimer());
      dispatch(cleanTaskInTimer());
      document.title = 'Task completed'
    }
  }
  return (
    <Card className={`bg-${taskType}`}>
      <Card.Body>
        <Stack direction={directionSelected} className='justify-content-between'>
          <Card.Text className='text-white'>{description}</Card.Text>
          <Stack gap={4} direction='horizontal'>
            <Card.Subtitle className='text-white text-opacity-75'>{transformTimeToString(duration)}</Card.Subtitle>
            <Stack gap={2} direction='horizontal'>
              {
                !completed && currentTask?.id !== id && (
                  <Button onClick={handleStartTimer}>
                    <BsPlayFill />
                  </Button>
                )
              }
              {
                currentTask && currentTask.id === id && (
                  <Button onClick={handleCompleteTask} variant='primary'>
                    <BsCheck />
                  </Button>
                )
              }
              <Button onClick={handleDelete} variant='danger'>
                <BsFillTrash3Fill />
              </Button>
              <Button onClick={handleEditTask} variant='warning'>
                <BsPencilSquare />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Card.Body>
      <EditModal
        taskId={id}
        show={showEditModal}
        handleClose={() => { setShowEditModal(false) }}
      />
      <AlertModal
        show={showAlertModal}
        handleClose={() => { setShowAlertModal(false) }}
      />
    </Card>
  )
}
