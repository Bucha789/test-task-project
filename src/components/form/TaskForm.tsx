import { ChangeEvent, FormEventHandler, useEffect, useState } from "react"
import { create } from "../../store/slices/tasksSlice"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useAppDispatch } from "../../store/hooks"
import { getTimeFromSeconds } from "../../utils/format"

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
  const [formState, setFormState] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const isFormDisabled = Object.values(formState).some(item => !item);
  const { time } = formState;

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmitValues: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(create({
      description: formState.description,
      duration: formState.time.hours * 3600 + formState.time.minutes * 60 + formState.time.seconds
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

  const handleTaskDuration = (type: 'min' | 'seg' | 'hr') => (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value || 0);
    if (type === 'hr') {
      setFormState({
        ...formState,
        time: {
          ...formState.time,
          hours: value
        }
      })
    }
    if (type === 'min') {
      setFormState({
        ...formState,
        time: {
          ...formState.time,
          minutes: value
        }
      })
    }
    if (type === 'seg') {
      setFormState({
        ...formState,
        time: {
          ...formState.time,
          seconds: value
        }
      })
    }
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

  useEffect(() => {
    const currentSeconds = formState.time.hours * 3600 + formState.time.minutes * 60 + formState.time.seconds;
    if (currentSeconds > 7200) {
      setError('Duration must be less than 2 hours')
    } else {
      setError(null)
    }
  }, [formState.time])

  return (
    <Form onSubmit={handleSubmitValues}>
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
            <Button onClick={handleClickDefaultButtons(1800)} variant="success">
              30min
            </Button>
          </Col>
          <Col>
            <Button onClick={handleClickDefaultButtons(2700)} variant="warning">
              45min
            </Button>
          </Col>
          <Col>
            <Button onClick={handleClickDefaultButtons(3600)} variant="danger">
              1hr
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control onChange={handleTaskDuration('hr')} max={59} min={0} type="number" name='hours' value={time.hours} />
            <Form.Label>hrs</Form.Label>
          </Col>
          <Col>
            <Form.Control onChange={handleTaskDuration('min')} max={59} min={0} type="number" name='minutes' value={time.minutes} />
            <Form.Label>min</Form.Label>
          </Col>
          <Col>
            <Form.Control onChange={handleTaskDuration('seg')} max={59} min={0} type="number" name='seconds' value={time.seconds} />
            <Form.Label>seg</Form.Label>
          </Col>
        </Row>
      </Form.Group>
      <Button disabled={isFormDisabled || Boolean(error)} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
