import { Col } from "react-bootstrap"
import { Task } from "../store/slices/tasksSlice"
import { TaskItem } from "./TaskItem"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { addTaskToTimer, startGlobalTimer } from "../store/slices/timerSlice"
type Props = {
  tasks: Task[]
  view: 'list' | 'card'
}

// This component is responsible for displaying a group of tasks
// It uses the TaskItem component to display each task
export const TaskGroup = ({ tasks, view }: Props) => {
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector(state => state.timer.task);
  const filteredTasks = currentTask ? tasks.filter(task => currentTask.id !== task.id) : tasks;
  // This function is responsible for initializing the timer
  // It adds the task to the timer and starts the global timer
  // with this function we have the time in the below of the page
  const handleInitializeTimer = (task: Task) => () => {
    if (!currentTask) {
      dispatch(addTaskToTimer(task))
      dispatch(startGlobalTimer())
    }
  }
  // We could avoid code using the spread operator to pass the props to the TaskItem component
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
  
  // This function is responsible for rendering the tasks in a list or card view
  // Col components are required to display the tasks in a grid and keep the responsive design
  return (
    view === 'card' ? (
      filteredTasks.map(item => <Col key={item.id} xl={4} md={6} xxl={3} sm={12} className="mb-3 mr-2 p-0">
        {renderTask(item)}
      </Col>
      )
    ) : filteredTasks.map(item => <Col key={item.id} xs={12} className="mb-3 mr-2 p-0">
      {renderTask(item)}
    </Col>
    )
  )
}
