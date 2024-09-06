import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { getTaskType } from '../../utils/tasks';
import { transformToObj } from '../../utils';

// Define a type for the slice state
export type TaskType = 'short' | 'medium' | 'long' | 'custom'
// Define a type for the task object. It's used to represent every task in the store
export type Task = {
  id: string
  description: string
  //duration in seconds
  duration: number
  createdAt: string
  completedAt?: string
  //the real time in seconds that the task took to be completed
  completedTime?: number
  completed: boolean
  type: TaskType
}

// Define a type for the current task. It's used to represent the task that is currently running
export type CurrentTask = Task & {
  currentDuration: number
}
// Some picks to make the code more readable and maintainable 
export type TaskInput = Pick<Task, 'description' | 'duration'>
export type TaskId = Pick<Task, 'id'>
export type TaskModify = Pick<Task, 'id' | 'description' | 'duration'>

export type TasksState = {
  addedTasks: Task[]
}
//Get the saved tasks from the local storage
const savedTasks = localStorage.getItem('addedTasks');


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    // if there are saved tasks, we transform them to an object, otherwise we set it to an empty array
    addedTasks: transformToObj<Task[], Task[]>(savedTasks, []),
  },
  reducers: {
    create: (state, action: PayloadAction<TaskInput>) => {
      // create a new task
      const { description, duration } = action.payload;
      const id = uuidv4();
      state.addedTasks.push({
        completed: false,
        createdAt: new Date().toISOString(),
        type: getTaskType(duration),
        description,
        duration,
        id,
      })
    },
    modify: (state, action: PayloadAction<TaskModify>) => {
      //modify an existing task
      const { id, description, duration } = action.payload;
      state.addedTasks = state.addedTasks.map((task) => {
        if (task && task.id === id) {
          return {
            ...task,
            description,
            duration,
            type: getTaskType(duration)
          }
        }
        return task
      })
    },
    remove: (state, action: PayloadAction<TaskId>) => {
      //delete an existing task
      state.addedTasks = state.addedTasks.filter(item => item.id !== action.payload.id)
    },
    markAsCompleted: (state, action: PayloadAction<TaskId & {
      duration: number
    }>) => {
      //mark as completed a task
      state.addedTasks = state.addedTasks.map((task) => {
        if (task && task.id === action.payload.id) {
          return {
            ...task,
            completed: true,
            completedAt: new Date().toISOString(),
            // calculate the time that the task took to be completed and added it to the task to calculate some process later
            completedTime: task.duration - action.payload.duration
          }
        }
        return task
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { create, markAsCompleted, modify, remove } = tasksSlice.actions


export default tasksSlice.reducer