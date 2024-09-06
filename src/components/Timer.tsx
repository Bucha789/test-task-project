import { Button, Col, ProgressBar, Row, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { transformTimeToDisplay } from "../utils/format";
import { calculateTimeProgress } from "../utils/time";
import { useEffect, useState } from "react";
import { BsArrowRepeat, BsCheck, BsFillPauseFill, BsFillTrashFill, BsPlayFill, BsStopFill } from "react-icons/bs";
import { reproduceAudio } from "../utils";
import { cleanTaskInTimer, reset, startGlobalTimer, stopGlobalTimer } from "../store/slices/timerSlice";
import { markAsCompleted } from "../store/slices/tasksSlice";
import audio from '/clock-alarm-8761.mp3';

//This component is responsible for managing the timer state and displaying the current task
//It uses the global state to manage the timer state and the tasks state
//It uses the reproduceAudio function to play an audio when the time is up
export const Timer = () => {
  const { isRunning, task: currentTask } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();
  const [isPaused, setIsPaused] = useState<boolean>(!!currentTask && !isRunning);
  const [isStopped, setIsStopped] = useState(false);
  // This function is responsible for stopping the timer
  // Stop timer doesn't mean that the task is completed, it just stops the timer
  const handleStopTask = () => {
    setIsStopped(true);
    dispatch(stopGlobalTimer());
  }
  // This function is responsible for completing the task
  // It marks the task as completed and stops the timer
  // it also cleans the task in the timer to avoid conflicts
  const handleCompleteTask = () => {
    if (currentTask) {
      //It's added the real duration to store it in the task
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
      // This is because the timer is managed by a setInterval and it's not cleared when the timer is stopped
      // We have to wait the timer to be cleared to start it again
      setTimeout(() => {
        dispatch(startGlobalTimer());
      }, 1000);
    }
  }

  const handlePauseTask = () => {
    setIsPaused(!isPaused);
    // If the timer is running and it's not paused, we stop
    if (isRunning && !isPaused) {
      return dispatch(stopGlobalTimer());
    }
    // The same as the handleRestartTimer function
    setTimeout(() => {
      dispatch(startGlobalTimer());
    }, 1000);
  }

  // This function is responsible for cleaning the task in the timer and the state
  const handleCleanTask = () => {
    setIsStopped(false);
    dispatch(cleanTaskInTimer());
  }

  // This effect is responsible for changing the document title to show the current task time
  // This could be part of the timerReducer
  useEffect(() => {
    if (currentTask) {
      document.title = `Focus 🚀 - ${transformTimeToDisplay(currentTask.currentDuration
      )}`
    }
    if (currentTask?.currentDuration === 0) {
      document.title = 'Time is up!'
      // It also plays an audio when the time is up
      reproduceAudio(audio);
      dispatch(cleanTaskInTimer())
      dispatch(markAsCompleted({ id: currentTask.id, duration: currentTask.duration }))
    }
  }, [currentTask, dispatch])

  //If there is a current task, it shows the task description and the timer controls
  //If there is not a current task, it shows a message to create a task
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
