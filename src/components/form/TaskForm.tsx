import { ChangeEvent, FormEventHandler, useState } from "react"
import { create, Task } from "../../store/slices/tasksSlice"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useAppDispatch } from "../../store/hooks"

export type FormState = Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'completed'>

const initialState: FormState = {
  description: '',
  duration: 0,
}

export const TaskForm = () => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const dispatch = useAppDispatch();
  const isFormDisabled = Object.values(formState).every(item => !item)

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmitValues: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(create(formState))
    setFormState(initialState)
  }
  return (
    <Form onSubmit={handleSubmitValues}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={handleChangeValues} type="text" name='description' placeholder="Enter Description" />
      </Form.Group>
      <Form.Text>Duration</Form.Text>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col>
            <Button variant="success">
              30min
            </Button>
          </Col>
          <Col>
            <Button variant="warning">
              45min
            </Button>
          </Col>
          <Col>
            <Button variant="danger">
              1hr
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control onChange={handleChangeValues} type="number" name='hours' />
            <Form.Label>hrs</Form.Label>
          </Col>
          <Col>
            <Form.Control onChange={handleChangeValues} type="number" name='minutes' />
            <Form.Label>min</Form.Label>
          </Col>
          <Col>
            <Form.Control onChange={handleChangeValues} type="number" name='seconds' />
            <Form.Label>seg</Form.Label>
          </Col>
        </Row>
      </Form.Group>
      <Button disabled={isFormDisabled} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
