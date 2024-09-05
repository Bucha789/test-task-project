import { ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import { useAppSelector } from "../store/hooks"
import { ReactEventHandler, useState } from "react";
import { Task, TaskType } from "../store/slices/tasksSlice";
import { BsList } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import dayjs from "dayjs";
import { TaskGroup } from "./TaskGroup";
import { displayTimeAgo } from "../utils/time";




export const TaskListContainer = () => {
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  const [filterByDuration, setFilterByDuration] = useState<TaskType | null>(null);
  const [view, setView] = useState<'card' | 'list'>('card');
  const sortedTasks = addedTasks.slice().sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
  const filteredTasks = filterByDuration ? sortedTasks.filter(item => item.type === filterByDuration) : sortedTasks;
  const groupedTasks: Record<string, Task[]> = filteredTasks.reduce((acc, item) => {
    const date: string = dayjs(item.createdAt).format('YYYY-MM-DD') || 'unknown'

    if(!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc;
  }, {} as Record<string, Task[]>)
  const handleFilterByDuration: ReactEventHandler<HTMLSelectElement> = (event) => {
    const value = event.currentTarget.value as TaskType;
    if (value) {
      return setFilterByDuration(value);
    }
    return setFilterByDuration(null);
  }

  return (
    <Container className="bg-purple">
      <Row className="mb-5">
        <Col>
          <ButtonGroup>
            <button onClick={() => setView('card')} className={`btn ${view === 'card' ? 'btn-primary' : 'btn-light'}`}><BsFillGridFill /></button>
            <button onClick={() => setView('list')} className={`btn ${view === 'list' ? 'btn-primary' : 'btn-light'}`}><BsList /></button>
          </ButtonGroup>
        </Col>
        <Col>
          <Form.Select onChange={handleFilterByDuration}>
            <option value=''>Filter by duration</option>
            <option value="short">30 minutes</option>
            <option value="medium">45 minutes</option>
            <option value="long">1 hour</option>
            <option value="x-long">More than 1 hour</option>
          </Form.Select>
        </Col>
      </Row>
        {
          Object.keys(groupedTasks).map(date => (<Row className="mb-3" key={date}>
            <div className="mb-2">{displayTimeAgo(date)}</div>
            <Row className="container-fluid">
              <TaskGroup tasks={groupedTasks[date]} view={view} />
            </Row>
          </Row>
          ))
        }
    </Container>
  )
}
