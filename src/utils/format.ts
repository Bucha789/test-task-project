export const getTimeFromSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  return {
    hours,
    minutes,
    seconds: sec
  }
}

export const transformTimeToString = (seconds: number) => {
  const time = getTimeFromSeconds(seconds);
  return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`
}