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

export const calculateTimeProgress = (seconds: number, totalSeconds: number) => {
  return Math.floor(seconds / totalSeconds * 100);
}