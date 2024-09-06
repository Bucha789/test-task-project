import dayjs from "dayjs";
import { HOURS_IN_SECONDS, MINUTES_IN_SECONDS } from "../constants";

/**
 * @description Get Object with the hours, minutes and seconds given the time in just seconds.
 * @param {number} timeInSeconds - The time in seconds.
 * @returns Object with the hours, minutes and seconds.
 * @example getTimeFromSeconds(3661) // { hours: 1, minutes: 1, seconds: 1 }
 */
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
/**
 * Calculate the progress of the time given the current time and the total time.
 * @param seconds - The current time in seconds.
 * @param totalSeconds - The total time in seconds.
 * @returns The progress in percentage.
 * @example calculateTimeProgress(30, 60) // 50
 */
export const calculateTimeProgress = (seconds: number, totalSeconds: number) => { // this function can be used with other proposals
  return Math.floor(seconds / totalSeconds * 100);
}

/**
 * @description Display the time in a human-friendly format.
 * @param date - The date in ISO string format
 * @returns The time in a human-friendly format.
 * @example transformTimeToDisplay("2021-09-01T12:00:00.000Z") // "Today"
 * @example transformTimeToDisplay("2021-08-31T12:00:00.000Z") // "Yesterday"
 * @example transformTimeToDisplay("2021-08-30T12:00:00.000Z") // "2 days ago"
 */
export const displayTimeAgo = (date: string) => {
  const now = dayjs();
  const dateToCompare = dayjs(date);

  const diffInDays = now.diff(dateToCompare, 'day');

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return dateToCompare.fromNow();
  }
}
