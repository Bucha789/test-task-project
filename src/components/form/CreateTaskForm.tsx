import { ChangeEvent, FormEventHandler, useCallback, useEffect, useState } from "react"
import { create } from "../../store/slices/tasksSlice"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useAppDispatch } from "../../store/hooks"
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
// This component is used in the TaskForm component to manage the form to create a task
// It uses the DefaultButtons and TimeInputs components
// It's located in the main part of the application
export const CreateTaskForm = () => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { time } = formState;

  // This function is used to handle the form state
  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }
  //This function is used to handle the form state
  const handleSubmitValues: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // We need to convert the time to seconds to store it in the database
    const duration = formState.time.hours * HOURS_IN_SECONDS + formState.time.minutes * MINUTES_IN_SECONDS + formState.time.seconds;
    dispatch(create({
      description: formState.description,
      duration
    }))
    setFormState(initialState)
  }

  const handleClickDefaultButtons = (seconds: number) => () => {
    if (seconds === HOURS_IN_SECONDS) {
      return setFormState({
        ...formState,
        time: {
          hours: 0,
          minutes: 60,
          seconds: 0
        }
      })
    }
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

  const handleErrors = useCallback(() => {
    // The task is using the time in seconds, so we need to convert the time to seconds
    const currentSeconds = formState.time.hours * HOURS_IN_SECONDS + formState.time.minutes * MINUTES_IN_SECONDS + formState.time.seconds;
    //We need to check if the time is less than 2 hours
    if (currentSeconds > MAX_TIME_ALLOWED) {
      return setError('Duration must be less than 2 hours')
    }
    // Or if the time is less than 0
    if (currentSeconds < 0) {
      return setError('Duration must be greater than 0')
    }
    // We need to check if the description and the time are filled
    if (!currentSeconds || !formState.description) {
      return setError('Description and duration are required')
    }

    setError(null)
  }, [formState])
  //TODO: Check if we can avoid this useEffect
  useEffect(() => {
    handleErrors()
  }, [handleErrors])

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
          <Col xl={4} md={8} sm={12} className="mb-3">
            <TimeInputs onChangeTaskDuration={handleTaskDuration} time={time} />
          </Col>
          <Col xl={5} md={12} sm={12} className="d-flex justify-content-start align-items-center">
            <Button disabled={Boolean(error)} variant="primary" type="submit" className="me-3 p-2">
              Create Task
            </Button>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="d-flex">
      </Form.Group>
    </Form>
  )
}
