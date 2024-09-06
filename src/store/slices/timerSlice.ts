import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { CurrentTask, Task } from "./tasksSlice";
import { transformToObj } from "../../utils";

export type TaskTimerState = {
  isRunning: boolean;
  task: CurrentTask | null;
};

// Get the saved task from the local storage
const savedTask = localStorage.getItem('task');

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    isRunning: false,
    //if there is a saved task, we transform it to an object, otherwise we set it to null
    task: transformToObj<CurrentTask, null>(savedTask, null),
  },
  reducers: {
    start: (state) => { state.isRunning = true; },
    stop: (state) => { state.isRunning = false; },
    reset: (state) => {
      if (state.task) state.task.currentDuration = state.task.duration;
      state.isRunning = false;
    },
    tick: (state) => { 
      if (state.isRunning && state.task) {
        state.task.currentDuration -= 1;
      }
    },
    // Add a task to the timer. With this we can know what task is currently running and do some operations with it
    addTaskToTimer: (state, action: PayloadAction<Task>) => {
      state.task = {
        ...action.payload,
        currentDuration: action.payload.duration
      };
    },
    // Clean the task in the timer. We have some states that depend of the task in the timer, so we have to clean it to avoid conflicts
    cleanTaskInTimer: (state) => {
      state.task = null;
      state.isRunning = false;
    }
  },
});

export const { start, stop, reset, tick, addTaskToTimer, cleanTaskInTimer } = timerSlice.actions;

export default timerSlice.reducer;

// Start the global timer. since we are using a setInterval, we have to dispatch the tick action every second
export const startGlobalTimer = () => (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(start());

  const intervalId = setInterval(() => {
    const { timer } = getState(); // Get the current state
    if (timer.isRunning && (timer?.task?.currentDuration || 0) > 0) {
      dispatch(tick()); // Decrease the seconds
    } else {
      clearInterval(intervalId); // Stop the timer
    }
  }, 1000);
};
// Stop the global timer. This could not be necessary, but if we need to call more actions when the timer stops, we can do it here
export const stopGlobalTimer = () => (dispatch: Dispatch) => {
  dispatch(stop());
};
// The same as the stopGlobalTimer, but we reset the timer to its initial state
export const resetGlobalTimer = () => (dispatch: Dispatch) => {
  dispatch(reset());
};
