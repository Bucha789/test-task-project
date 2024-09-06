import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { CurrentTask, Task } from "./tasksSlice";
import { transformToObj } from "../../utils";

export type TaskTimerState = {
  isRunning: boolean;
  task: CurrentTask | null;
};


const savedTask = localStorage.getItem('task');

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    isRunning: false,
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
    addTaskToTimer: (state, action: PayloadAction<Task>) => {
      state.task = {
        ...action.payload,
        currentDuration: action.payload.duration
      };
    },
    cleanTaskInTimer: (state) => {
      state.task = null;
      state.isRunning = false;
    }
  },
});

export const { start, stop, reset, tick, addTaskToTimer, cleanTaskInTimer } = timerSlice.actions;

export default timerSlice.reducer;

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

export const stopGlobalTimer = () => (dispatch: Dispatch) => {
  dispatch(stop());
};

export const resetGlobalTimer = () => (dispatch: Dispatch) => {
  dispatch(reset());
};
