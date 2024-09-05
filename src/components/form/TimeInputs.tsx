import { Form, Stack } from "react-bootstrap"
import { MAX_TIME_INPUT_VALUE } from "../../constants"

type Props = {
  time: {
    hours: number
    minutes: number
    seconds: number
  }
  onChangeTaskDuration: (key: keyof Props['time']) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TimeInputs = ({ onChangeTaskDuration, time }: Props) => {
  return (
    <Stack direction="horizontal" gap={2}>
      <Form.Control onChange={onChangeTaskDuration('hours')} max={MAX_TIME_INPUT_VALUE} min={0} type="number" name='hours' value={time.hours} />
      <Form.Label>hrs</Form.Label>
      <Form.Control onChange={onChangeTaskDuration('minutes')} max={MAX_TIME_INPUT_VALUE} min={0} type="number" name='minutes' value={time.minutes} />
      <Form.Label>min</Form.Label>
      <Form.Control onChange={onChangeTaskDuration('seconds')} max={MAX_TIME_INPUT_VALUE} min={0} type="number" name='seconds' value={time.seconds} />
      <Form.Label>seg</Form.Label>
    </Stack>
  )
}
