import { faker } from '@faker-js/faker';
import { Task } from "../store/slices/tasksSlice";
import { v4 as uuidv4 } from 'uuid';
import { LONG_TIME, MEDIUM_TIME, SHORT_TIME } from "../constants";
export const generateTasks = (n: number) => {
  const tasks = [];
  for (let i = 0; i < n; i++) {
    const type = faker.helpers.arrayElement(['short', 'medium', 'long', 'custom']);
    const duration = type === 'short' ? SHORT_TIME : type === 'medium' ? MEDIUM_TIME : type === 'long' ? LONG_TIME : faker.number.int({ min: 1, max: 7200 });
    const task: Task = {
      id: uuidv4(),
      description: faker.lorem.sentence(),
      duration,
      type,
      createdAt: faker.date.recent({days: 7}).toISOString(),
      completed: true,
    }
    tasks.push(task);
  }
  return tasks;
}