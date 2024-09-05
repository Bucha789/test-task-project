import { ChangeEvent, FormEventHandler, useCallback, useEffect, useState } from "react"
import { cleanEditingTask, create, modify } from "../../store/slices/tasksSlice"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getTimeFromSeconds } from "../../utils/time"
import { HOURS_IN_SECONDS,  MAX_TIME_ALLOWED, MINUTES_IN_SECONDS } from "../../constants"
import { DefaultButtons } from "./DefaultButtons"
import { TimeInputs } from "./TimeInputs"

export type FormState = {
  description: string
  time: {
    hours: number
    minutes: number
    seconds: number
  }
}

const initialState: FormState = {
  description: '',
  time: {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
}

export const CreateTaskForm = () => {
  const { editingTask } = useAppSelector(state => state.tasks);
  const initialValues = editingTask ? {
    description: editingTask.description,
    time: getTimeFromSeconds(editingTask.duration)
  } : initialState;
  const [formState, setFormState] = useState<FormState>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { time } = formState;

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmitValues: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newDuration = formState.time.hours * HOURS_IN_SECONDS + formState.time.minutes * MINUTES_IN_SECONDS + formState.time.seconds;
    if (editingTask) {
      dispatch(modify({
        description: formState.description,
        duration: newDuration,
        id: editingTask.id
      }))
      return dispatch(cleanEditingTask())
    }
    dispatch(create({
      description: formState.description,
      duration: newDuration
    }))
    setFormState(initialState)
  }

  const handleClickDefaultButtons = (seconds: number) => () => {
    const time = getTimeFromSeconds(seconds);
    setFormState({
      ...formState,
      time
    })
  }

  const handleTaskDuration = (type: keyof FormState['time']) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value || 0);
    setFormState({
      ...formState,
      time: {
        ...formState.time,
        [type]: value
      }
    })
  }

  useEffect(() => {
    const timeEntries = Object.entries(formState.time);
    timeEntries.forEach(([key, value]) => {
      if (value < 0) {
        setFormState({
          ...formState,
          time: {
            ...formState.time,
            [key]: 0
          }
        })
      }
      if (value > 59) {
        setFormState({
          ...formState,
          time: {
            ...formState.time,
            [key]: 59
          }
        })
      }
    })
  }, [formState])

  const handleErrors = useCallback(() => {
    const currentSeconds = formState.time.hours * HOURS_IN_SECONDS + formState.time.minutes * MINUTES_IN_SECONDS + formState.time.seconds;
    if (currentSeconds > MAX_TIME_ALLOWED) {
      return setError('Duration must be less than 2 hours')
    }
    if (currentSeconds < 0) {
      return setError('Duration must be greater than 0')
    }

    if (!currentSeconds || !formState.description) {
      return setError('Description and duration are required')
    }

    setError(null)
  }, [formState])

  useEffect(() => {
    handleErrors()
  }, [handleErrors])

  useEffect(() => {
    const initialValues = editingTask ? {
      description: editingTask.description,
      time: getTimeFromSeconds(editingTask.duration)
    } : initialState;
    setFormState(initialValues)
  }, [editingTask])

  return (
    <Form onSubmit={handleSubmitValues} className="card p-4 mt-5">
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={handleChangeValues} type="text" name='description' placeholder="What are you working now?" value={formState.description} />
      </Form.Group>
      {
        error && <Form.Text className="text-danger">{error}</Form.Text>
      }
      <Form.Group className="mb-3">
        <Form.Label>Duration</Form.Label>
        <Row>
          <Col xl={3} md={5} sm={12} className="mb-3">
            <DefaultButtons onClick={handleClickDefaultButtons} />
          </Col>
          <Col xl={4} md={8} sm={12}>
            <TimeInputs onChangeTaskDuration={handleTaskDuration} time={time} />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="d-flex">
        <Button disabled={Boolean(error)} variant="primary" type="submit" className="me-3">
          {editingTask ? 'Edit Task' : 'Create Task'}
        </Button>
        {
          editingTask && (
            <Button onClick={() => dispatch(cleanEditingTask())} variant="secondary" type="button">
              Cancel
            </Button>
          )
        }
      </Form.Group>
    </Form>
  )
}
