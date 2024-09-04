import { ProgressBar } from "react-bootstrap";
import { useAppSelector } from "../store/hooks"
import { transformTimeToDisplay } from "../utils/format";
import { calculateTimeProgress } from "../utils/time";

export const Timer = () => {
  const currentTask = useAppSelector(state => state.tasks.currentTask);
  return currentTask ? (
    <div className="text-center">
      <h2>{currentTask.description}</h2>
      <h3>{transformTimeToDisplay(currentTask.currentDuration)}</h3>
      <ProgressBar striped now={calculateTimeProgress(currentTask.currentDuration, currentTask.duration)} />
    </div>
  ) : (<div className="text-center fst-italic">There's nothing here. Please create a task to start the magic ;).</div>)
}
