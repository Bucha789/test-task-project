import { Button, Form, Modal } from 'react-bootstrap';
import { EditTaskForm } from '../form/EditTaskForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTimeFromSeconds } from '../../utils/time';
import { FormState } from '../form/CreateTaskForm';
import { FormEvent, useState } from 'react';
import { modify } from '../../store/slices/tasksSlice';
import { HOURS_IN_SECONDS, MINUTES_IN_SECONDS } from '../../constants';

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

export const EditModal = ({ show, handleClose, taskId }: Props) => {
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  const dispatch = useAppDispatch();
  const task = addedTasks.find(task => task.id === taskId);
  const taskToEdit = task ? {
    description: task.description,
    time: getTimeFromSeconds(task.duration)
  } : initialState;
  const [formState, setFormState] = useState<FormState>(taskToEdit);

  if (!task) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(modify({
      description: formState.description,
      duration: formState.time.hours * HOURS_IN_SECONDS + formState.time.minutes * MINUTES_IN_SECONDS + formState.time.seconds,
      id: taskId
    }))
    handleClose();
  }


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
