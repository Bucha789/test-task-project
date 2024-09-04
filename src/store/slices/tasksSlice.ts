import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export type Task = {
  id: string
  description: string
  //duration in seconds
  duration: number
  createdAt: string
  completedAt?: string
  completed: boolean
}
export type TaskInput = Pick<Task, 'description' | 'duration'>
export type TaskId = Pick<Task, 'id'>
export type TasksState = {
  addedTasks: Task[]
  currentTask?: Task | null
}

const initialState: TasksState = {
  addedTasks: [],
  currentTask: null,
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<TaskInput>) => {
      // create a new task
      const { description, duration } = action.payload;
      const id = uuidv4();
      state.addedTasks.push({
        completed: false,
        createdAt: new Date().toISOString(),
        description,
        duration,
        id,
      })
    },
    modify: (state, action: PayloadAction<Task>) => {
      //modify an existing task
      const { id, description, duration } = action.payload;
      const task = state.addedTasks.find((task) => task.id === id);
      if (task) {
        task.description = description;
        task.duration = duration;
      }
    },
    remove: (state, action: PayloadAction<TaskId>) => {
      //delete an existing task
      state.addedTasks = state.addedTasks.filter(item => item.id !== action.payload.id)
    },
    markAsCompleted: (state, action: PayloadAction<TaskId>) => {
      //mark as completed a task
      const task = state.addedTasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.completed = true
        task.completedAt = new Date().toISOString()
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { create, markAsCompleted, modify, remove } = tasksSlice.actions

export default tasksSlice.reducer