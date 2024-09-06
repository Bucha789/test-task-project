import { describe, it, expect } from 'vitest';
import reducer, { create, markAsCompleted, modify, remove, TaskInput, TaskModify, TasksState } from '../../../store/slices/tasksSlice';
// This tests validates the tasksSlice reducer and its state changes
describe('Renders main page correctly', async () => {
  const initialState: TasksState = {
    addedTasks: [],
  }
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      {
        addedTasks: [],
      }
    )
  });

  it('should handle markAsCompleted', () => {
    const initialState: TasksState = {
      addedTasks: [
        {
          description: 'task',
          duration: 10,
          id: '2',
          completed: false,
          type: 'medium',
          createdAt: '2022-01-01',
        },
      ],
    };

    const actual = reducer(initialState, markAsCompleted({ id: initialState.addedTasks[0].id, duration: 10 }));
    expect(actual).toEqual({
      addedTasks: [
        {
          ...initialState.addedTasks[0],
          completed: true,
          completedAt: expect.any(String),
          completedTime: 0,
        },
      ],
    });
  });

  it('should handle create', () => {
    const task: TaskInput = {
      description: 'task',
      duration: 0,
    }

    const actual = reducer(initialState, create(task));
    expect(actual).toEqual({
      addedTasks: [{
        ...task,
        id: expect.any(String),
        completed: false,
        type: expect.any(String),
        createdAt: expect.any(String),
      }],
    });
  });

  it('should handle modify', () => {
    const initialState: TasksState = {
      addedTasks: [
        {
          description: 'task',
          duration: 0,
          id: '1',
          completed: false,
          type: 'long',
          createdAt: '2022-01-01',
        },
      ],
    };

    const modifiedTask: TaskModify = {
      description: 'modified task',
      duration: 10,
      id: '1',
    };

    const actual = reducer(initialState, modify(modifiedTask));
    expect(actual).toEqual({
      addedTasks: [
        {
          ...modifiedTask,
          id: '1',
          completed: false,
          type: 'custom',
          createdAt: '2022-01-01',
        },
      ],
    });
  });

  it('should handle remove', () => {

    const initialState: TasksState = {
      addedTasks: [
        {
          description: 'task',
          duration: 0,
          id: '1',
          completed: false,
          type: 'short',
          createdAt: '2022-01-01',
        },
      ],
    };

    const actual = reducer(initialState, remove({ id: '1' }));
    expect(actual).toEqual({
      addedTasks: [],
    });
  });
});