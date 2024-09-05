import { Card, Container } from "react-bootstrap"
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory"
import { useAppSelector } from "../store/hooks";
import { displayTimeAgo } from "../utils/time";
import { groupTasksByDate } from "../utils/tasks";
import dayjs from "dayjs";



export const Analytics = () => {
  const tasks = useAppSelector(state => state.tasks.addedTasks);
  const sortedTasks = tasks.slice().sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
  const tasksGroupedByDay = groupTasksByDate(sortedTasks);
  const totalDurationPerDay = Object.keys(tasksGroupedByDay).map(day => {
    return {
      day,
      duration: tasksGroupedByDay[day].reduce((acc, item) => acc + item.duration, 0)
    }
  })
  const realDurationPerDay = Object.keys(tasksGroupedByDay).map(day => {
    return {
      day,
      duration: tasksGroupedByDay[day].reduce((acc, item) => acc + (item?.completedTime || 0), 0)
    }
  });
  const totalDurationPerDayInHours = totalDurationPerDay.map(item => {
    return {
      day: item.day,
      duration: item.duration / 3600
    }
  })

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
              data={Object.keys(tasksGroupedByDay).map(day => {
                return {
                  day,
                  tasks: tasksGroupedByDay[day].length
                }
              })}
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
              data={realDurationPerDay.map(item => {
                return {
                  day: item.day,
                  duration: item.duration / 3600
                }
              })}
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
