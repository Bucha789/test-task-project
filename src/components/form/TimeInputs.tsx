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


  const handlePreventValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const max = Number(event.target.max);
    if (value <= max) {
      onChangeTaskDuration(event.target.name as keyof Props['time'])(event)
    }
  }

  return (
    <Stack direction="horizontal" gap={2}>
      {/* <Form.Control onChange={onChangeTaskDuration('hours')} max={MAX_TIME_INPUT_VALUE} min={0} type="number" name='hours' value={time.hours} />
      <Form.Label>hrs</Form.Label> */}
      <Form.Control onChange={handlePreventValues} max={120} min={0} type="number" name='minutes' value={time.minutes} />
      <Form.Label>min</Form.Label>
      <Form.Control onChange={handlePreventValues} max={MAX_TIME_INPUT_VALUE} min={0} type="number" name='seconds' value={time.seconds} />
      <Form.Label>seg</Form.Label>
    </Stack>
  )
}
