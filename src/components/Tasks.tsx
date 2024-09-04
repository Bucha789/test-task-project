import { ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { useAppSelector } from "../store/hooks"
import { Task } from "./Task"
import { ReactEventHandler, useState } from "react";
import { TaskType } from "../store/slices/tasksSlice";



export const Tasks = () => {
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  const [sortOrder, setSortOrder] = useState('recent');
  const [filterByDuration, setFilterByDuration] = useState<TaskType | null>(null);
  const taskToShow = sortOrder === 'recent' ? addedTasks.slice().reverse() : addedTasks;
  const filteredTasks = filterByDuration ? taskToShow.filter(item => item.type === filterByDuration) : taskToShow;

  const handleSortOrder = (order: 'recent' | 'old') => () => {
    setSortOrder(order);
  }

  const handleFilterByDuration: ReactEventHandler<HTMLSelectElement> = (event) => {
    const value = event.currentTarget.value as TaskType;
    if (value) {
      return setFilterByDuration(value);
    }
    return setFilterByDuration(null);
  }


  return (
    <div className="bg-purple">
      <Row>
        <Col>
          <ButtonGroup>
            <button onClick={handleSortOrder('recent')} className="btn btn-primary">Recent first</button>
            <button onClick={handleSortOrder('old')} className="btn btn-primary">Old first</button>
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
      <div>
        {
          filteredTasks.map(item => (
            <Task
              key={item.id}
              id={item.id}
              description={item.description}
              duration={item.duration}
              taskType={item.type}
            />
          ))
        }
      </div>
    </div>
  )
}
