import { Card, Container } from "react-bootstrap"
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory"
import { useAppSelector } from "../store/hooks";
import { displayTimeAgo } from "../utils/time";
import { groupTasksByDate } from "../utils/tasks";
import dayjs from "dayjs";


// The Analytics component is the page that shows the analytics of the tasks
// This page just renders the some tables. I think we could add something else or change the whole page
// but in the requirements it's just to show the analytics
export const Analytics = () => {
  const tasks = useAppSelector(state => state.tasks.addedTasks);
  // Sort the tasks by createdAt date to manipulate the data easily
  const sortedTasks = tasks.slice().sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
  // Group the tasks by day to show the data in a better
  const tasksGroupedByDay = groupTasksByDate(sortedTasks);
  // Calculate the total duration of the tasks per day
  const totalDurationPerDay = Object.keys(tasksGroupedByDay).map(day => {
    return {
      day,
      duration: tasksGroupedByDay[day].reduce((acc, item) => acc + item.duration, 0)
    }
  })
  // Calculate the real duration of the tasks per day. You can complete the task before the time ends so the real duration is different from the duration
  const realDurationPerDay = Object.keys(tasksGroupedByDay).map(day => {
    return {
      day,
      duration: tasksGroupedByDay[day].reduce((acc, item) => acc + (item?.completedTime || 0), 0)
    }
  });
  // Convert the duration from seconds to hours to show the data in a better way
  const totalDurationPerDayInHours = totalDurationPerDay.map(item => {
    return {
      day: item.day,
      duration: item.duration / 3600
    }
  })

  const realDurationPerDayInHours = realDurationPerDay.map(item => {
    return {
      day: item.day,
      duration: item.duration / 3600
    }
  })

  const completedTasksPerDay = Object.keys(tasksGroupedByDay).map(day => {
    return {
      day,
      tasks: tasksGroupedByDay[day].filter(item => item.completed).length
    }
  })

  // If there are no tasks added yet show a message with indications
  if (Object.keys(tasksGroupedByDay).length === 0) {
    return (
      <Container className="mb-5 py-5">
        <Card className="p-4 mb-4">
          <Card.Title>Oops</Card.Title>
          <Card.Body>
            <p>No tasks added yet</p>
            <p>Please start using the application to collect data</p>
          </Card.Body>
        </Card>
      </Container>
    )
  }
  // Show the analytics. Three tables with the data of the tasks
  return (
    <Container className="mb-5 py-5">
      <Card className="p-4 mb-4">
        <Card.Title>Total tasks completed per day </Card.Title>
        <Card.Body>
          <VictoryChart
            theme={VictoryTheme.material}
            width={800}
            domainPadding={20}
            title="Total tasks completed per day"
            padding={{ bottom: 100, left: 100, right: 20 }}
          >
            <VictoryAxis
              tickValues={Object.keys(tasksGroupedByDay)}
              tickFormat={day => displayTimeAgo(day)}
            />
            <VictoryAxis
              dependentAxis
              tickValues={[1, 5, 10, 15]}
              tickFormat={(x: number) => `${x} tasks`}
              width={400}
            />
            <VictoryBar
              data={completedTasksPerDay}
              style={{
                data: { fill: "#0dab76" }
              }}
              x="day"
              y="tasks"
            />
          </VictoryChart>
        </Card.Body>
      </Card>
      <Card className="p-4 mb-4">
        <Card.Title>Total time spent on tasks</Card.Title>
        <VictoryChart
          theme={VictoryTheme.material}
          width={800}
          domainPadding={20}
          title="Total time spent on tasks"
          padding={{ bottom: 100, left: 100, right: 20 }}
        >
          <VictoryAxis
            dependentAxis
            tickValues={[2, 4, 6, 8]}
            tickFormat={hour => `${hour}h`}
          />
          <VictoryAxis
            tickValues={Object.keys(tasksGroupedByDay)}
            tickFormat={(x: string) => displayTimeAgo(x)}
            width={400}
          />
          <VictoryBar
            data={totalDurationPerDayInHours}
            x="day"
            y="duration"
            style={{
              data: { fill: "#139a43" }
            }}
          />
        </VictoryChart>
      </Card>
      <Card className="p-4 mb-4">
        <Card.Title>Real time spent on tasks per day</Card.Title>
        <Card.Body>
          <VictoryChart
            theme={VictoryTheme.material}
            width={800}
            domainPadding={20}
            title="Real time spent on tasks"
            padding={{ bottom: 100, left: 100, right: 20 }}
          >
            <VictoryAxis
              dependentAxis
              tickValues={[2, 4, 6, 8]}
              tickFormat={hour => `${hour}h`}
            />
            <VictoryAxis
              tickValues={Object.keys(tasksGroupedByDay)}
              tickFormat={(x: string) => displayTimeAgo(x)}
              width={400}
            />
            <VictoryBar
              data={realDurationPerDayInHours}
              x="day"
              y="duration"
              style={{
                data: { fill: "#0b5d1e" }
              }}
            />
          </VictoryChart>
        </Card.Body>
      </Card>
    </Container>
  )
}
