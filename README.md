# Countdown Timer
This project pretends to create a countdown timer that can be used in different situations. The user can set the time and the timer will start counting down. When the time is up, the timer will play a sound to alert the user.

Project Website: [Countdown Timer](https://main--arkon-data-test.netlify.app/)

## Features
- **Tasks**: The user can create tasks and set the time for each one.
- **Timer**: The user can set the time and the timer will start counting down.
- **Sound**: When the time is up, the timer will play a sound to alert the user.
- **Analytics**: The user can see the tasks completed in the last 7 days.
- **Responsive**: The application is responsive and can be used on different devices.

## Technologies
- **HTML, CSS**: For the structure and styling of the application.
- **TypeScript**: Used for safer and strongly typed development.
- **Vite**: Tool used for fast project creation and development.

## Main libraries used in the project
### [Redux Toolkit](https://redux-toolkit.js.org/)
  This library was used to manage the state of the application, tasks and the timer.
### [React-bootstrap](https://react-bootstrap.github.io/)
  It's used to create the UI components used in the project.

### [React-icons](https://react-icons.github.io/react-icons/)
  To add icons to the project, the React-icons library was used.
### [Victory](https://formidable.com/open-source/victory/)
  It's used to create the chart that shows the tasks completed by the user in the analytics page.
### [react-router-dom](https://reactrouter.com/en/main)
  To create the task page and the analytics page, the react-router-dom library was used.
### [dayjs](https://day.js.org/)
  Some functions use the dayjs library to manipulate dates.
### [fakerjs](https://fakerjs.dev/)
  Inside this project there is a script that generates fake data to be used in the application. The fakerjs library was used to generate this data.


## Prerequisites
- Node.js (v18.0.0 or higher) installed
- Visual Studio Code (or any other code editor)
- Git installed

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

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

