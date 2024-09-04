import { ChangeEvent, FormEventHandler, useCallback, useEffect, useState } from "react"
import { cleanEditingTask, create, modify } from "../../store/slices/tasksSlice"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getTimeFromSeconds } from "../../utils/time"
import { HOURS_IN_SECONDS, LONG_TIME, MAX_TIME_INPUT_VALUE, MAX_TIME_ALLOWED, MEDIUM_TIME, MINUTES_IN_SECONDS, SHORT_TIME } from "../../constants"

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

export const TaskForm = () => {
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
    <Form onSubmit={handleSubmitValues} className="card p-4">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={handleChangeValues} type="text" name='description' placeholder="Enter Description" value={formState.description}/>
      </Form.Group>
      <Form.Text>Duration</Form.Text>
      {
        error && <Form.Text className="text-danger">{error}</Form.Text>
      }
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col>
            <Button onClick={handleClickDefaultButtons(SHORT_TIME)} variant="success">
              30min
            </Button>
          </Col>
          <Col>
            <Button onClick={handleClickDefaultButtons(MEDIUM_TIME)} variant="warning">
              45min
            </Button>
          </Col>
          <Col>
            <Button onClick={handleClickDefaultButtons(LONG_TIME)} variant="danger">
              1hr
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control onChange={handleTaskDuration('hours')} max={MAX_TIME_INPUT_VALUE} min={0} type="number" name='hours' value={time.hours} />
            <Form.Label>hrs</Form.Label>
          </Col>
          <Col>
            <Form.Control onChange={handleTaskDuration('minutes')} max={MAX_TIME_INPUT_VALUE} min={0} type="number" name='minutes' value={time.minutes} />
            <Form.Label>min</Form.Label>
          </Col>
          <Col>
            <Form.Control onChange={handleTaskDuration('seconds')} max={MAX_TIME_INPUT_VALUE} min={0} type="number" name='seconds' value={time.seconds} />
            <Form.Label>seg</Form.Label>
          </Col>
        </Row>
      </Form.Group>
      <Button disabled={Boolean(error)} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
