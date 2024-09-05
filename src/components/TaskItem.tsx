import { useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { BsPlayFill } from "react-icons/bs";
import { useAppDispatch } from '../store/hooks'
import { remove } from '../store/slices/tasksSlice'
import { transformTimeToString } from '../utils/format'
import { EditModal } from './modals/EditModal'
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";


type Props = {
  description: string
  duration: number
  id: string
  taskType: string
  initializeTimer: () => void
  viewType?: 'list' | 'card'
}

export const TaskItem = ({ description, duration, id, taskType, initializeTimer, viewType }: Props) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const directionSelected = viewType === 'card' ? 'vertical' : 'horizontal';
  const handleDelete = () => {
    dispatch(remove({ id }))
  }
  const handleEditTask = () => {
    setShow(true);
  }
  return (
    <Card className={`bg-${taskType}`}>
      <Card.Body>
        <Stack direction={directionSelected} className='justify-content-between'>
          <Card.Text className='text-white'>{description}</Card.Text>
          <Stack gap={4} direction='horizontal'>
            <Card.Subtitle className='text-white text-opacity-75'>{transformTimeToString(duration)}</Card.Subtitle>
            <Stack gap={2} direction='horizontal'>
              <Button onClick={initializeTimer}>
                <BsPlayFill />
              </Button>
              <Button onClick={handleDelete} variant='danger'>
                <BsFillTrash3Fill />
              </Button>
              <Button onClick={handleEditTask} variant='warning'>
                <BsPencilSquare />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Card.Body>
      <EditModal
        taskId={id}
        show={show}
        handleClose={() => { setShow(false) }}
      />
    </Card>
  )
}
