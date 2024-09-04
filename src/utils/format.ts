import { getTimeFromSeconds } from "./time";

export const transformTimeToString = (seconds: number) => {
  const time = getTimeFromSeconds(seconds);
  return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`
}
export const transformTimeToDisplay = (seconds: number) => {
  const time = getTimeFromSeconds(seconds);
  return `${time.hours.toString().padStart(2, '0')}h ${time.minutes.toString().padStart(2, '0')}m ${time.seconds.toString().padStart(2, '0')}s`
}