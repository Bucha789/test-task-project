import { Button, ButtonGroup } from 'react-bootstrap'
import { LONG_TIME, MEDIUM_TIME, SHORT_TIME } from '../../constants'

type Props = {
  onClick: (time: number) => () => void
}
// This component is used in the EditTaskForm and CreateTaskForm component to manage the default buttons for the task duration
export const DefaultButtons = ({ onClick }: Props) => {
  return (
    <ButtonGroup className="bg-transparent">
      <Button onClick={onClick(SHORT_TIME)} className="bg-short">
        30min
      </Button>
      <Button onClick={onClick(MEDIUM_TIME)} className="bg-medium">
        45min
      </Button>
      <Button onClick={onClick(LONG_TIME)} className="bg-long">
        1hr
      </Button>
  </ButtonGroup>
  )
}
