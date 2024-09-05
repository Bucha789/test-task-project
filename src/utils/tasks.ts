import dayjs from "dayjs";
import { LONG_TIME, MEDIUM_TIME, SHORT_TIME } from "../constants";
import { Task } from "../store/slices/tasksSlice";

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

export const groupTasksByDate = (tasks: Task[]) => {
  return tasks.reduce((acc, item) => {
    const date: string = dayjs(item.createdAt).format('YYYY-MM-DD') || 'unknown'

    if(!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc;
  }, {} as Record<string, Task[]>)
}