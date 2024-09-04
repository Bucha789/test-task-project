import { ButtonGroup } from "react-bootstrap";
import { useAppSelector } from "../store/hooks"
import { Task } from "./Task"
import { useState } from "react";

export const Tasks = () => {
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  const [sortOrder, setSortOrder] = useState('recent');
  const taskToShow = sortOrder === 'recent' ? addedTasks.slice().reverse() : addedTasks;

  const handleSortOrder = (order: 'recent' | 'old') => () => {
    setSortOrder(order);
  }

  return (
    <div className="bg-purple">
        <ButtonGroup>
          <button onClick={handleSortOrder('recent')} className="btn btn-primary">Recent first</button>
          <button onClick={handleSortOrder('old')} className="btn btn-primary">Old first</button>
        </ButtonGroup>
      <div>
        {
          taskToShow.map(item => (
            <Task
              key={item.id}
              id={item.id}
              description={item.description}
              duration={item.duration}
            />
          ))
        }
      </div>
    </div>
  )
}
