import { Button, Col, ProgressBar, Row, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { transformTimeToDisplay } from "../utils/format";
import { calculateTimeProgress } from "../utils/time";
import { useEffect, useState } from "react";
import { BsArrowRepeat, BsCheck, BsFillPauseFill, BsFillTrashFill, BsPlayFill, BsStopFill } from "react-icons/bs";
import { reproduceAudio } from "../utils";
import audio from '/clock-alarm-8761.mp3';
import { cleanTaskInTimer, reset, startGlobalTimer, stopGlobalTimer } from "../store/slices/timerSlice";
import { markAsCompleted } from "../store/slices/tasksSlice";

export const Timer = () => {
  const { isRunning, task: currentTask } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const handleStopTask = () => {
    setIsStopped(true);
    dispatch(stopGlobalTimer());
  }
  const handleCompleteTask = () => {
    if (currentTask) {
      dispatch(markAsCompleted({ id: currentTask?.id, duration: currentTask.currentDuration }));
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

  const handleCleanTask = () => {
    dispatch(cleanTaskInTimer());
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
      dispatch(markAsCompleted({ id: currentTask.id, duration: currentTask.duration }))
    }
  }, [currentTask, dispatch])

  return currentTask ? (
    <div>
      <Row>
        <Col sm={12} md={5} xl={8} className="my-2 mx-3">
          <div>{currentTask.description}</div>
        </Col>
        <Col sm={12} md={5} xl={3} className="my-2 mx-3">
          <Stack direction="horizontal" gap={3} className="flex-wrap">
            <div>{transformTimeToDisplay(currentTask.currentDuration)}</div>
            <Button onClick={handleCompleteTask} variant='success'>
              <BsCheck />
            </Button>
            {
              !isStopped ? (<Button onClick={handlePauseTask} variant='primary'>
                {
                  isPaused ? <BsPlayFill /> : <BsFillPauseFill />
                }
              </Button>) : (<Button variant="warning" onClick={handleCleanTask}>
                <BsFillTrashFill />
              </Button>)
            }
            <Button onClick={handleStopTask} variant='danger' disabled={isStopped}>
              <BsStopFill />
            </Button>
            <Button onClick={handleRestartTimer} variant="secondary" disabled={!isRunning || isPaused}>
              <BsArrowRepeat />
            </Button>
          </Stack>
        </Col>
      </Row>
      <ProgressBar striped now={calculateTimeProgress(currentTask.currentDuration, currentTask.duration)} />
    </div>
  ) : (<div className="container text-center py-3 px-2">There's nothing here. Please create a task to start the magic ;).</div>)
}
