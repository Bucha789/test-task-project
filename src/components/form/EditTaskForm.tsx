import { Col, Container, Form, Row } from "react-bootstrap"
import { TimeInputs } from "./TimeInputs";
import { DefaultButtons } from "./DefaultButtons";
import { ChangeEvent, SetStateAction, useState } from "react";
import { getTimeFromSeconds } from "../../utils/time";
import { FormState } from "./CreateTaskForm";


type Props = {
  onChangeFormState: (value: SetStateAction<FormState>) => void
  values: FormState
}

export const EditTaskForm = ({ onChangeFormState, values }: Props) => {
  const [error] = useState<string | null>(null);
  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeFormState({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleClickDefaultButtons = (seconds: number) => () => {
    const time = getTimeFromSeconds(seconds);
    onChangeFormState({
      ...values,
      time
    })
  }

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
