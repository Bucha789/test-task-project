import { ButtonGroup, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useAppSelector } from "../store/hooks"
import { ReactEventHandler, useState } from "react";
import { Task } from "../store/slices/tasksSlice";
import { BsList } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import dayjs from "dayjs";
import { TaskGroup } from "./TaskGroup";
import { displayTimeAgo } from "../utils/time";
import { filterTasksByDuration, groupTasksByDate } from "../utils/tasks";
import { TaskItem } from "./TaskItem";



// This component is responsible for displaying the list of tasks
// It also allows the user to filter the tasks by duration and change the view between list and card
// It uses the global state to get the tasks and the current task
// It uses the TaskGroup component to render the tasks in a better way
export const TaskListContainer = () => {
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  const currentTask = useAppSelector(state => state.timer.task);
  // Filter the tasks by duration to show the tasks in a better way
  const [filterByDuration, setFilterByDuration] = useState<'short' | 'medium' | 'long' | null>(null);
  // Change the view between list and card
  // There's a prop that causes the prop drilling anti-pattern to avoid it we could use a context or a global state.
  // We could change this and add a stateReducer for the views(example)
  const [view, setView] = useState<'card' | 'list'>('list');
  // Sort the tasks by createdAt date to manipulate the data easily
  // We could add a selector to sort the tasks in the store to avoid sorting the tasks in the component if we want to reuse this logic
  const sortedTasks = addedTasks.slice().sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
  // Filter the tasks by duration
  const filteredTasks = filterByDuration ? filterTasksByDuration(sortedTasks, filterByDuration) : sortedTasks;

  const groupedTasks: Record<string, Task[]> = groupTasksByDate(filteredTasks);
  // This function is responsible for filtering the tasks by duration
  // It's used in a select element to filter the tasks by duration
  const handleFilterByDuration: ReactEventHandler<HTMLSelectElement> = (event) => {
    const value = event.currentTarget.value as 'short' | 'medium' | 'long';
    if (value) {
      return setFilterByDuration(value);
    }
    return setFilterByDuration(null);
  }
  // This is showed in this way:
  // If there are no tasks added yet show a message with indications
  // If there is a task that is currently running show the current task
  // If there are tasks added show the tasks grouped by day
  // I think we could add a loading state to show a spinner while the tasks are loading but currently this app is not fetching data from an API
  return (
    <Container>
      <Row>
      </Row>
        {
          currentTask && <Row className="mb-3">
            <div className="mb-2 fs-4">Current Task</div>
            <TaskItem 
              description={currentTask.description}
              duration={currentTask.duration}
              id={currentTask.id}
              taskType={currentTask.type}
              initializeTimer={() => {}}
              viewType={'list'}
            />
          </Row>
        }
        <Stack direction='horizontal' gap={4} className="align-items-center mt-4 mb-2">
          <div className="fs-4">Recent Tasks</div>
          <ButtonGroup>
            <button onClick={() => setView('list')} className={`btn ${view === 'list' ? 'btn-primary' : 'btn-light'}`}><BsList /></button>
            <button onClick={() => setView('card')} className={`btn ${view === 'card' ? 'btn-primary' : 'btn-light'}`}><BsFillGridFill /></button>
          </ButtonGroup>
          <Col sm={6} md={7} xl={9}>
            <Form.Select onChange={handleFilterByDuration}>
              <option value=''>Filter by duration</option>
              <option value="short">short</option>
              <option value="medium">medium</option>
              <option value="long">large</option>
            </Form.Select>
          </Col>
        </Stack>
        {
          Object.keys(groupedTasks).length ? Object.keys(groupedTasks).map(date => (<Row className="mb-3" key={date}>
            <div className="mb-2">{displayTimeAgo(date)}</div>
            <div className="p-0 d-flex gap-3 flex-wrap">
              <TaskGroup tasks={groupedTasks[date]} view={view} />
            </div>
          </Row>
          )) : <div className="text-center fs-5 mt-5">No tasks found, Start being productive :)</div>
        }
    </Container>
  )
}
