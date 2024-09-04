import { faker } from '@faker-js/faker';
import { Task } from "../store/slices/tasksSlice";
import { v4 as uuidv4 } from 'uuid';
import { LONG_TIME, MEDIUM_TIME, SHORT_TIME } from "../constants";
export const generateTasks = (n: number) => {
  const tasks = [];
  for (let i = 0; i < n; i++) {
    const task: Task = {
      id: uuidv4(),
      description: faker.lorem.sentence(),
      duration: faker.helpers.arrayElement([SHORT_TIME,  MEDIUM_TIME, LONG_TIME]),
      type: faker.helpers.arrayElement(['short', 'medium', 'long']),
      createdAt: faker.date.recent().toISOString(),
      completed: faker.datatype.boolean(),
    }
    tasks.push(task);
  }
  return tasks;
}