import { ButtonGroup, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useAppSelector } from "../store/hooks"
import { ReactEventHandler, useState } from "react";
import { Task } from "../store/slices/tasksSlice";
import { BsList } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import dayjs from "dayjs";
import { TaskGroup } from "./TaskGroup";
import { displayTimeAgo } from "../utils/time";
import { filterTasksByDuration } from "../utils/tasks";
import { TaskItem } from "./TaskItem";




export const TaskListContainer = () => {
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  const currentTask = useAppSelector(state => state.timer.task);
  const [filterByDuration, setFilterByDuration] = useState<'short' | 'medium' | 'long' | null>(null);
  const [view, setView] = useState<'card' | 'list'>('list');
  const sortedTasks = addedTasks.slice().sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
  const filteredTasks = filterByDuration ? filterTasksByDuration(sortedTasks, filterByDuration) : sortedTasks;

  const groupedTasks: Record<string, Task[]> = filteredTasks.reduce((acc, item) => {
    const date: string = dayjs(item.createdAt).format('YYYY-MM-DD') || 'unknown'

    if(!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc;
  }, {} as Record<string, Task[]>)
  const handleFilterByDuration: ReactEventHandler<HTMLSelectElement> = (event) => {
    const value = event.currentTarget.value as 'short' | 'medium' | 'long';
    if (value) {
      return setFilterByDuration(value);
    }
    return setFilterByDuration(null);
  }

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
          <Col sm={6} md={8} xl={10}>
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
