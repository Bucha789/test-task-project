import { describe, it, expect, vi } from 'vitest';
import reducer, { addTaskToTimer, TaskTimerState, cleanTaskInTimer, reset, resetGlobalTimer, start, startGlobalTimer, stop, stopGlobalTimer, tick } from '../../../store/slices/timerSlice';
import { CurrentTask } from '../../../store/slices/tasksSlice';
// Tests
describe('Renders main page correctly', async () => {

  it('should return the initial state', () => {
    const initialState: TaskTimerState = {
      task: null,
      isRunning: false,
    }
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  });
  it('should handle start', () => {
    const initialState: TaskTimerState = {
      task: null,
      isRunning: false,
    }
    const actual = reducer(initialState, start());
    expect(actual).toEqual({
      task: null,
      isRunning: true,
    });
  });
  it('should handle stop', () => {
    const initialState: TaskTimerState = {
      task: null,
      isRunning: true,
    }
    const actual = reducer(initialState, stop());
    expect(actual).toEqual({
      task: null,
      isRunning: false,
    });
  });
  it('should handle reset', () => {
    const task: CurrentTask = {
      id: '1',
      description: 'task',
      duration: 10,
      currentDuration: 5,
      type: 'medium',
      createdAt: '2022-01-01',
      completed: false,
    }
    const initialState: TaskTimerState = {
      isRunning: true,
      task,
    }
    const actual = reducer(initialState, reset());
    expect(actual).toEqual({
      isRunning: false,
      task: {
        ...task,
        currentDuration: task.duration,
      },
    });
  });
  it('should handle tick', () => {
    const task: CurrentTask = {
      id: '1',
      description: 'task',
      duration: 10,
      currentDuration: 5,
      type: 'medium',
      createdAt: '2022-01-01',
      completed: false,
    }
    const initialState: TaskTimerState = {
      isRunning: true,
      task,
    }
    const actual = reducer(initialState, tick());
    expect(actual).toEqual({
      isRunning: true,
      task: {
        ...task,
        currentDuration: 4,
      },
    });
  })
  it('should handle addTaskToTimer', () => {
    const task: CurrentTask = {
      id: '1',
      description: 'task',
      duration: 10,
      currentDuration: 10,
      type: 'medium',
      createdAt: '2022-01-01',
      completed: false,
    }
    const initialState: TaskTimerState = {
      isRunning: false,
      task: null,
    }
    const actual = reducer(initialState, addTaskToTimer(task));
    expect(actual).toEqual({
      isRunning: false,
      task,
    });
  });

  it('should handle cleanTaskInTimer', () => {
    const task: CurrentTask = {
      id: '1',
      description: 'task',
      duration: 10,
      currentDuration: 10,
      type: 'medium',
      createdAt: '2022-01-01',
      completed: false,
    }
    const initialState: TaskTimerState = {
      isRunning: false,
      task,
    }
    const actual = reducer(initialState, cleanTaskInTimer());
    expect(actual).toEqual({
      isRunning: false,
      task: null,
    });
  });

  it('should handle startGlobalTimer', async () => {

    const task: CurrentTask = {
      id: '1',
      description: 'task',
      duration: 10,
      currentDuration: 10,
      type: 'medium',
      createdAt: '2022-01-01',
      completed: false,
    }

    const initialState: TaskTimerState = {
      isRunning: false,
      task,
    }
    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({ timer: initialState });
    startGlobalTimer()(dispatch, getState);
    await vi.waitFor(() => {
      const intervalId = setInterval(() => {
      dispatch(start());
      const { timer } = getState();
      if (timer.isRunning && (timer?.task?.currentDuration || 0) > 0) {
        dispatch(tick());
      } else {
        clearInterval(intervalId);
      }
    }, 1000)}, {
      timeout: 2000,
    });
    expect(dispatch).toBeCalledWith(start());
  });

  it('should handle stopGlobalTimer', async () => {
    const dispatch = vi.fn();
    stopGlobalTimer()(dispatch);
    expect(dispatch).toBeCalledWith(stop());
  });

  it('should handle resetGlobalTimer', async () => {
    const dispatch = vi.fn();
    resetGlobalTimer()(dispatch);
    expect(dispatch).toBeCalledWith(reset());
  });
});