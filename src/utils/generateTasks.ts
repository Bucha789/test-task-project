import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { Task } from "../store/slices/tasksSlice";
import { v4 as uuidv4 } from 'uuid';
import { LONG_TIME, MEDIUM_TIME, SHORT_TIME } from "../constants";

/**
 * @description This function generates a random number of tasks with faker js library
 * @param n number of tasks to generate
 * @returns {Task[]} array of tasks given the number of tasks
 */
export const generateTasks = (n: number) => {
  const tasks = [];
  for (let i = 0; i < n; i++) {
    // a task can be short, medium, long or custom
    const type = faker.helpers.arrayElement(['short', 'medium', 'long', 'custom']);
    // a random date in the last 6 days for the creation date
    const createdAt = faker.date.recent({days: 6}).toISOString();
    // a task
    const duration = type === 'short' ? SHORT_TIME : type === 'medium' ? MEDIUM_TIME : type === 'long' ? LONG_TIME : faker.number.int({ min: 1, max: 7200 });
    // create a random completed duration between 80% and 100% of the total duration
    const randomCompletedDuration = faker.number.int({ min: duration * .8, max: duration });
    // completed date is the createdAt date plus the random completed duration
    const parsedCreatedAt = dayjs(createdAt);
    // add the random completed duration to the createdAt date
    const completedAt = parsedCreatedAt.add(randomCompletedDuration, 'seconds').toISOString();
    const task: Task = {
      id: uuidv4(),
      description: faker.lorem.sentence(),
      completedTime: Math.floor(randomCompletedDuration),
      completed: true,
      duration,
      type,
      createdAt,
      completedAt,
    }
    tasks.push(task);
  }
  return tasks;
}