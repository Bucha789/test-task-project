import { Task } from "./Task"

export const Tasks = () => {
  return (
    <div className="bg-purple">
      {
        // This will be replaced by the Filter component
      }
      <div>
        {
          Array.from({ length: 5 }).map((_, index) => (
            <Task key={index} />
          ))
        }
      </div>
    </div>
  )
}
