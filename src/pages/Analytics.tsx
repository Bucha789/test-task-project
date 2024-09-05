import { Container } from "react-bootstrap"
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

  return (
    <Container className="mb-5 py-5">
      <div>
        <h3>Total tasks per day</h3>
      </div>
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
          tickFormat={(x: number) => x}
          width={400}
        />
        <VictoryBar
          data={Object.keys(tasksGroupedByDay).map(day => {
            return {
              day,
              tasks: tasksGroupedByDay[day].length
            }
          })}
          x="day"
          y="tasks"
        />
      </VictoryChart>
      <div>
        <h3>Total time spent on tasks per day</h3>
      </div>
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
        />
      </VictoryChart>
      <div>
        <h3>Real time spent on tasks per day</h3>
      </div>
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
        />
      </VictoryChart>
    </Container>
  )
}
