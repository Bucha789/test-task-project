import { ProgressBar } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { transformTimeToDisplay } from "../utils/format";
import { calculateTimeProgress } from "../utils/time";
import { useEffect } from "react";
import { reproduceAudio } from "../utils";
import audio from '../../public/clock-alarm-8761.mp3';
import { cleanTaskInTimer } from "../store/slices/timerSlice";

export const Timer = () => {
  const currentTask = useAppSelector(state => state.timer.task);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentTask) {
      document.title = `${currentTask.description} - ${transformTimeToDisplay(currentTask.currentDuration
      )}`
    }
    if (currentTask?.currentDuration === 0) {
      document.title = 'Time is up!'
      reproduceAudio(audio);
      dispatch(cleanTaskInTimer())
    }
  }, [currentTask, dispatch])

  return currentTask ? (
    <div className="text-center">
      <h2>{currentTask.description}</h2>
      <h3>{transformTimeToDisplay(currentTask.currentDuration)}</h3>
      <ProgressBar striped now={calculateTimeProgress(currentTask.currentDuration, currentTask.duration)} />
    </div>
  ) : (<div className="text-center fst-italic">There's nothing here. Please create a task to start the magic ;).</div>)
}
