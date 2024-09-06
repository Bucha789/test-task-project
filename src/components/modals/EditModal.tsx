import { Button, Form, Modal } from 'react-bootstrap';
import { EditTaskForm } from '../form/EditTaskForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTimeFromSeconds } from '../../utils/time';
import { FormState } from '../form/CreateTaskForm';
import { FormEvent, useCallback, useState } from 'react';
import { modify } from '../../store/slices/tasksSlice';
import { HOURS_IN_SECONDS, MAX_TIME_ALLOWED, MINUTES_IN_SECONDS } from '../../constants';

type Props = {
  show: boolean
  handleClose: () => void
  taskId: string
}

const initialState = {
  description: '',
  time: {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
}

// This component is used to show a modal to edit a task
// it receives the show, handleClose and taskId props
export const EditModal = ({ show, handleClose, taskId }: Props) => {
  const dispatch = useAppDispatch();
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  const [error, setError] = useState<string | null>(null);
  const task = addedTasks.find(task => task.id === taskId);
  // Get the task to edit
  const taskToEdit = task ? {
    description: task.description,
    time: getTimeFromSeconds(task.duration)
  } : initialState;
  // use the task to edit as the initial state of the form
  const [formState, setFormState] = useState<FormState>(taskToEdit);

  
  
  // This function is used to handle the errors in the form
  // We could move this function to a helper file to avoid code duplication
  const handleErrors = useCallback(() => {
    // The task is using the time in seconds, so we need to convert the time to seconds
    const currentSeconds = formState.time.hours * HOURS_IN_SECONDS + formState.time.minutes * MINUTES_IN_SECONDS + formState.time.seconds;
    if (currentSeconds > MAX_TIME_ALLOWED) {
      return 'Duration must be less than 2 hours'
    }
    if (currentSeconds < 0) {
      return 'Duration must be greater than 0'
    }
    
    if (!currentSeconds || !formState.description) {
      return 'Description and duration are required'
    }
    
    return null
  }, [formState])

  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = handleErrors();
    // If there is an error, we set the error state and stop the function
    if (error) {
      return setError(error);
    }
    dispatch(modify({
      description: formState.description,
      duration: formState.time.hours * HOURS_IN_SECONDS + formState.time.minutes * MINUTES_IN_SECONDS + formState.time.seconds,
      id: taskId
    }))
    handleClose();
  }
  // If there is no task, we return null
  if (!task) return null;
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTaskForm
            onChangeFormState={setFormState}
            values={formState}
            error={error}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
