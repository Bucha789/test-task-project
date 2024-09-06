# Countdown Timer
This project pretends to create a countdown timer that can be used in different situations. The user can set the time and the timer will start counting down. When the time is up, the timer will play a sound to alert the user.

## Technologies
- HTML
- CSS
- TypeScript
- Vite

## Prerequisites
- Node.js (v18.0.0 or higher) installed

## How to run
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser and go to `http://localhost:5173/`

## How to create fake data
1. Run the command `npm run create-tasks`
2. Go to `src/store/slices/tasksSlice.ts` file and change the `tasks` variable to the value of the `tasks.json` file
  ```typescript
    import tasks from '../../database/tasks.json'

    const tasksSlice = createSlice({
      name: 'tasks',
      initialState: {
        addedTasks: tasks,
      },
      ...
  })
  ```
3. Run `npm run dev` command to see the changes

If you want to add more tasks, you can modify the `src/script.js` file and run the `npm run create-tasks` command again.
  ```javascript
    const array = generateTasks(50); // Change the number to the amount of tasks you want to generate
  ```
