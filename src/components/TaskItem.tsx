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

// This component is responsible for displaying a task item
// It uses the global state to get the current task
export const TaskItem = ({ description, duration, id, taskType, initializeTimer, viewType, completed }: Props) => {
  const currentTask = useAppSelector(state => state.timer.task);
  const dispatch = useAppDispatch();
  // This state is used to show the edit modal if you want to edit the task
  const [showEditModal, setShowEditModal] = useState(false);
  // This state is used to show the alert modal if there something wrong with the user flow
  const [showAlertModal, setShowAlertModal] = useState(false);
  // This state is used to show the text in the alert modal
  const [textAlertModal, setTextAlertModal] = useState('');
  // This is used to change the direction of the stack component
  const directionSelected = viewType === 'card' ? 'vertical' : 'horizontal';

  // This function is responsible for starting the timer
  // if there is a task running, it shows an alert modal to avoid conflicts with the flow
  const handleStartTimer = () => {
    if (currentTask && currentTask.id !== id) {
      setTextAlertModal('You are in the middle of a task. Please complete it before starting a new one.');
      return setShowAlertModal(true);
    }
    initializeTimer();
  }
  // This function is responsible for deleting the task
  // if there is a task running, it shows an alert modal to avoid conflicts with the flow
  const handleDelete = () => {
    if (currentTask && currentTask.id === id) {
      setTextAlertModal('The task can not be deleted while it is running. Please stop the task and try again or finish the task and delete it.');
      return setShowAlertModal(true);
    }
    dispatch(remove({ id }))
  }
  //This function is responsible for editing the task
  // if there is a task running and the user wants to edit the same task, it shows an alert modal to avoid conflicts with the flow
  const handleEditTask = () => {
    if (currentTask && currentTask.id === id) {
      setTextAlertModal('You are in the middle of a task. Please complete it before starting a new one.');
      return setShowAlertModal(true);
    }
    setShowEditModal(true);
  }
  // This function is responsible for completing the task
  // It marks the task as completed and stops the timer
  const handleCompleteTask = () => {
    if (currentTask) {
      //It's added the real duration to store it in the task
      dispatch(markAsCompleted({ id: currentTask?.id, duration: currentTask.currentDuration }));
      dispatch(stopGlobalTimer());
      dispatch(cleanTaskInTimer());
      document.title = 'Task completed'
    }
  }
  // This renders a card with the task information and the buttons to start, complete, delete and edit the task
  // There are some conditions to show the buttons according to the task state
  // Some modals are used to show alerts to the user
  return (
    <Card className={`bg-${taskType}`}>
      <Card.Body>
        <Stack direction={directionSelected} className='justify-content-between flex-wrap'>
          <Card.Text className='text-white'>{description}</Card.Text>
          <Stack gap={4} direction='horizontal'>
            <Card.Subtitle className='text-white text-opacity-75'>{transformTimeToString(duration)}</Card.Subtitle>
            <Stack gap={2} direction='horizontal'>
              {
                completed && (
                    <BsCheck color={'white'} title='¡Task completed!' />
                )
              }
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
        text={textAlertModal}
        title='Oops'
      />
      <AlertModal
        show={showAlertModal}
        handleClose={() => { setShowAlertModal(false) }}
        text={textAlertModal}
        title='Oops'
      />
    </Card>
  )
}
