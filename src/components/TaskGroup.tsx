import { Col } from "react-bootstrap"
import { Task } from "../store/slices/tasksSlice"
import { TaskItem } from "./TaskItem"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { addTaskToTimer, startGlobalTimer } from "../store/slices/timerSlice"
type Props = {
  tasks: Task[]
  view: 'list' | 'card'
}
export const TaskGroup = ({ tasks, view }: Props) => {
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector(state => state.timer.task);
  const filteredTasks = currentTask ? tasks.filter(task => currentTask.id !== task.id) : tasks;
  const handleInitializeTimer = (task: Task) => () => {
    if (!currentTask) {
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
    completed={task.completed}
  />)

  return (
    view === 'card' ? (
      filteredTasks.map(item => <Col key={item.id} xl={4} md={6} xxl={3} sm={12} className="mb-3 mr-2 p-0">
        {renderTask(item)}
      </Col>
      )
    ) : filteredTasks.map(item => <Col key={item.id} xl={12} className="mb-3 mr-2 p-0">
      {renderTask(item)}
    </Col>
    )
  )
}
