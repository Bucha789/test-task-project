import dayjs from "dayjs";
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

export const getLastSevenDays = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const today = new Date();
  const currentDayIndex = today.getDay();
  
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDayIndex - i + 7) % 7;
    last7Days.push(daysOfWeek[dayIndex]);
  }

  return last7Days;
}