import { HOURS_IN_SECONDS, MINUTES_IN_SECONDS } from "../constants";

export const getTimeFromSeconds = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / HOURS_IN_SECONDS);
  const minutes = Math.floor((timeInSeconds % HOURS_IN_SECONDS) / MINUTES_IN_SECONDS);
  const seconds = timeInSeconds % 60;
  return {
    hours,
    minutes,
    seconds
  }
}

export const calculateTimeProgress = (seconds: number, totalSeconds: number) => {
  return Math.floor(seconds / totalSeconds * 100);
}