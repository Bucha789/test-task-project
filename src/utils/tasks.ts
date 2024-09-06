import dayjs from "dayjs";
import { LONG_TIME, MEDIUM_TIME, SHORT_TIME } from "../constants";
import { Task } from "../store/slices/tasksSlice";

/**
 * @description This function returns the type of a task based on its duration
 * @param duration - duration of the task in seconds
 * @returns "short" | "medium" | "long" | "custom"
 * @example getTaskType(3600) // "long"
 * @example getTaskType(1800) // "short"
 */
export const getTaskType = (duration: number) => {
  if (duration === SHORT_TIME) {
    return "short";
  }
  if (duration === MEDIUM_TIME) {
    return "medium";
  }
  if (duration === LONG_TIME) {
    return "long";
  }
  return "custom";
}

/**
 * @description This function filters an array of tasks by duration
 * @param tasks tasks array to filter
 * @param duration duration to filter by - "short" | "medium" | "long"
 * @returns array of tasks that match the duration
 * @example filterTasksByDuration(tasks, "short") // array of tasks with duration <= SHORT_TIME == 1800
 */
export const filterTasksByDuration = (tasks: Task[], duration: string) => {
  return tasks.filter(task => {
    if (duration === 'short') {
      return task.duration <= SHORT_TIME;
    }
    if (duration === 'medium') {
      return task.duration > SHORT_TIME && task.duration <= MEDIUM_TIME;
    }
    if (duration === 'long') {
      return task.duration >= LONG_TIME;
    }
    return false;
  })
}
/**
 * @description This function groups an array of tasks by date using the createdAt property returning an object with the dates as keys and the tasks as values
 * @param tasks array of tasks to group
 * @returns object with the dates as keys and the tasks as values
 * @example groupTasksByDate(tasks) // { "2021-09-01": [task1, task2], "2021-09-02": [task3, task4] }
 */
export const groupTasksByDate = (tasks: Task[]) => {
  return tasks.slice().reduce((acc, item) => {
    const date: string = dayjs(item.createdAt).format('YYYY-MM-DD') || 'unknown'

    if(!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc;
  }, {} as Record<string, Task[]>)
}