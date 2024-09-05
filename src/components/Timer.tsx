import { Button, Col, ProgressBar, Row, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { transformTimeToDisplay } from "../utils/format";
import { calculateTimeProgress } from "../utils/time";
import { useEffect, useState } from "react";
import { BsArrowRepeat, BsCheck, BsFillPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";
import { reproduceAudio } from "../utils";
import audio from '../../public/clock-alarm-8761.mp3';
import { cleanTaskInTimer, reset, startGlobalTimer, stopGlobalTimer } from "../store/slices/timerSlice";
import { markAsCompleted } from "../store/slices/tasksSlice";

export const Timer = () => {
  const { isRunning, task: currentTask } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();
  const [isPaused, setIsPaused] = useState(false);

  const handleStopTask = () => {
    dispatch(stopGlobalTimer());
  }
  const handleCompleteTask = () => {
    if (currentTask) {
      dispatch(markAsCompleted({ id: currentTask?.id }));
      dispatch(stopGlobalTimer());
      dispatch(cleanTaskInTimer());
      document.title = 'Task completed'
    }
  }

  const handleRestartTimer = () => {
    if (currentTask && isRunning) {
      dispatch(stopGlobalTimer());
      dispatch(reset());
      // Start the timer again after 1 second to avoid conflicts with the previous timer instance
      setTimeout(() => {
        dispatch(startGlobalTimer());
      }, 1000);
    }
  }

  const handlePauseTask = () => {
    setIsPaused(!isPaused);
    if (isRunning && !isPaused) {
      return dispatch(stopGlobalTimer());
    }
    setTimeout(() => {
      dispatch(startGlobalTimer());
    }, 1000);
  }

  useEffect(() => {
    if (currentTask) {
      document.title = `Focus 🚀 - ${transformTimeToDisplay(currentTask.currentDuration
      )}`
    }
    if (currentTask?.currentDuration === 0) {
      document.title = 'Time is up!'
      reproduceAudio(audio);
      dispatch(cleanTaskInTimer())
    }
  }, [currentTask, dispatch])

  return currentTask ? (
    <div>
      <Row className="d-flex justify-content-between">
        <Col>
          <div>{currentTask.description}</div>
        </Col>
        <Col xs={3}>
          <Stack direction="horizontal" gap={3}>
            <div>{transformTimeToDisplay(currentTask.currentDuration)}</div>
            <Button onClick={handleCompleteTask} variant='success'>
              <BsCheck />
            </Button>
            <Button onClick={handlePauseTask} variant='primary'>
              {
                isPaused ?  <BsPlayFill/> : <BsFillPauseFill/>
              }
            </Button>
            <Button onClick={handleStopTask} variant='danger'>
              <BsStopFill />
            </Button>
            <Button onClick={handleRestartTimer} variant="secondary">
              <BsArrowRepeat />
            </Button>
          </Stack>
        </Col>
      </Row>
      <ProgressBar striped now={calculateTimeProgress(currentTask.currentDuration, currentTask.duration)} />
    </div>
  ) : (<div className="text-center fst-italic">There's nothing here. Please create a task to start the magic ;).</div>)
}
