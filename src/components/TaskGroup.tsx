import { Col } from "react-bootstrap"
import { create, Task } from "../store/slices/tasksSlice"
import { TaskItem } from "./TaskItem"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { addTaskToTimer, startGlobalTimer } from "../store/slices/timerSlice"
type Props = {
  tasks: Task[]
  view: 'list' | 'card'
}
export const TaskGroup = ({ tasks, view }: Props) => {
  const dispatch = useAppDispatch();
  const reversedTasks = tasks.slice().reverse();
  const currentTask = useAppSelector(state => state.timer.task);
  const handleInitializeTimer = (task: Task) => () => {
    if (!currentTask) {
      dispatch(create(task))
      dispatch(addTaskToTimer(task))
      dispatch(startGlobalTimer())
    }
  }
  const renderTask = (task: Task) => (<TaskItem
    key={task.id}
    description={task.description}
    duration={task.duration}
    id={task.id}
    taskType={task.type}
    initializeTimer={handleInitializeTimer(task)}
    viewType={view}
  />)

  return (
    view === 'card' ? (
      reversedTasks.map(item => <Col key={item.id} xl={4} md={6} xxl={3} sm={12} className="mb-3">
        {renderTask(item)}
      </Col>
      )
    ) : reversedTasks.map(item => <Col key={item.id} xl={12} className="mb-3">
      {renderTask(item)}
    </Col>
    )
  )
}
