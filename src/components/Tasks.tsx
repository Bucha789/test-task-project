import { useAppSelector } from "../store/hooks"
import { Task } from "./Task"

export const Tasks = () => {
  const addedTasks = useAppSelector(state => state.tasks.addedTasks);
  return (
    <div className="bg-purple">
      {
        // This will be replaced by the Filter component
      }
      <div>
        {
          addedTasks.map(item => (
            <Task
              key={item.id}
              description={item.description}
              duration={item.duration}
            />
          ))
        }
      </div>
    </div>
  )
}
