import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import timerReducer from './slices/timerSlice'


/*
  We have to reducers in our store: tasks and timer.
  tasksReducer is responsible for managing the tasks state, while timerReducer is responsible for managing the timer state.
*/
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
  },
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: combineReducers({
      tasks: tasksReducer,
      timer: timerReducer,
    }),
    preloadedState
  })
}

//As we use Typescript to keep the types of our store, we have to export the RootState and AppDispatch types.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof setupStore> 