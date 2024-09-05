const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

const LONG_TIME = 3600; // 1 hour
const MEDIUM_TIME = 2700; // 45 minutes
const SHORT_TIME = 1800; // 30 minutes

const generateTasks = (n) => {
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
    
    const task = {
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

// generate 50 tasks
const array = generateTasks(50);
const json = JSON.stringify(array, null, 2);

const directoryPath = path.join(__dirname, 'database');
const fileExits = fs.existsSync(directoryPath);
if (!fileExits) {
  fs.mkdirSync(directoryPath);
  fs.writeFileSync(path.join(directoryPath, 'tasks.json'), json);
  console.log('JSON file has been saved.');
} else {
  console.log('Directory already exists.');
}
