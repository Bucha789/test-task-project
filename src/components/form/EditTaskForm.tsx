import { Col, Container, Form, Row } from "react-bootstrap"
import { TimeInputs } from "./TimeInputs";
import { DefaultButtons } from "./DefaultButtons";
import { ChangeEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import { getTimeFromSeconds } from "../../utils/time";
import { FormState } from "./CreateTaskForm";
import { HOURS_IN_SECONDS, MAX_TIME_ALLOWED, MINUTES_IN_SECONDS } from "../../constants";


type Props = {
  onChangeFormState: (value: SetStateAction<FormState>) => void
  values: FormState
}
// This component is used in the TaskForm component to manage the form to edit a task
// It uses the DefaultButtons and TimeInputs components
export const EditTaskForm = ({ onChangeFormState, values }: Props) => {
  const [error, setError] = useState<string | null>(null);

  // TODO: Check if we can re use this function to avoid code duplication
  //This function is used in the TimeInputs component to handle the time of the task
  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeFormState({
      ...values,
      [event.target.name]: event.target.value
    })
  }
  // TODO: Refactor this function to use the new time format
  // This function is used to handle the default buttons for the task duration
  const handleClickDefaultButtons = (seconds: number) => () => {
    const time = getTimeFromSeconds(seconds);
    // we need to handle the case when the user selects 1 hour
    // we could add a hour input field or we could change the form state to handle this case
    if (seconds === HOURS_IN_SECONDS) {
      return onChangeFormState({
        ...values,
        time: {
          hours: 0,
          minutes: 60,
          seconds: 0
        }
      })
    }
    onChangeFormState({
      ...values,
      time
    })
  }

  // This function is used to handle the time of the task in the time input fields
  const handleTaskDuration = (type: keyof typeof values['time']) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value || 0);
    onChangeFormState({
      ...values,
      time: {
        ...values.time,
        [type]: value
      }
    })
  }

  // This function is used to handle the errors in the form
  const handleErrors = useCallback(() => {
    // The task is using the time in seconds, so we need to convert the time to seconds
    const currentSeconds = values.time.hours * HOURS_IN_SECONDS + values.time.minutes * MINUTES_IN_SECONDS + values.time.seconds;
    if (currentSeconds > MAX_TIME_ALLOWED) {
      return setError('Duration must be less than 2 hours')
    }
    if (currentSeconds < 0) {
      return setError('Duration must be greater than 0')
    }

    if (!currentSeconds || !values.description) {
      return setError('Description and duration are required')
    }

    setError(null)
  }, [values])
  //TODO: Check if we can avoid this useEffect
  useEffect(() => {
    handleErrors()
  }, [handleErrors])

  // This component returns the form to edit a task
  // it's almost the same as the CreateTaskForm component
  return (
    <Container className="p-4 mt-5">
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={handleChangeValues} type="text" name='description' placeholder="What are you working now?" value={values.description} />
      </Form.Group>
      {
        error && <Form.Text className="text-danger">{error}</Form.Text>
      }
      <Form.Group className="mb-3">
        <Form.Label>Duration</Form.Label>
        <Row>
          <Col xs={12} className="mb-3">
            <DefaultButtons onClick={handleClickDefaultButtons} />
          </Col>
          <Col xs={12}>
            <TimeInputs onChangeTaskDuration={handleTaskDuration} time={values.time} />
          </Col>
        </Row>
      </Form.Group>
    </Container>
  )
}
