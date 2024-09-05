import { ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { Task as TaskComponent } from "./Task"
import { ReactEventHandler, useState } from "react";
import { create, Task, TaskType } from "../store/slices/tasksSlice";
import { addTaskToTimer, startGlobalTimer } from "../store/slices/timerSlice";
import { BsList } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";




export const Tasks = () => {
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  const currentTask = useAppSelector(state => state.timer.task);
  const [filterByDuration, setFilterByDuration] = useState<TaskType | null>(null);
  const [view, setView] = useState<'card' | 'list'>('card');
  const filteredTasks = filterByDuration ? addedTasks.filter(item => item.type === filterByDuration) : addedTasks;
  const dispatch = useAppDispatch();
  const handleFilterByDuration: ReactEventHandler<HTMLSelectElement> = (event) => {
    const value = event.currentTarget.value as TaskType;
    if (value) {
      return setFilterByDuration(value);
    }
    return setFilterByDuration(null);
  }

  const handleInitializeTimer = (task: Task) => () => {
    if (!currentTask) {
      dispatch(create(task))
      dispatch(addTaskToTimer(task))
      dispatch(startGlobalTimer())
    }
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
            <option value="custom">More than 1 hour</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {
          filteredTasks.slice().reverse().map(item => (view === 'card' ? (
            <Col key={item.id} xl={4} md={6} xxl={3} sm={12} className="mb-3">
              <TaskComponent
                key={item.id}
                id={item.id}
                description={item.description}
                duration={item.duration}
                taskType={item.type}
                initializeTimer={handleInitializeTimer(item)}
                viewType={view}
                />
            </Col>) : (
              <Col key={item.id} xs={12} className="mb-3">
              <TaskComponent
                key={item.id}
                id={item.id}
                description={item.description}
                duration={item.duration}
                taskType={item.type}
                initializeTimer={handleInitializeTimer(item)}
                viewType={view}
              />
            </Col>
          )
          ))
        }
      </Row>
    </Container>
  )
}
