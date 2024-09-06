import { getTimeFromSeconds } from "./time";

/**
 * 
 * @param {number} timeInSeconds The time in seconds
 * @returns {string} The time in the format HH:MM:SS
 * @example transformTimeToString(3661) // "01:01:01"
 * @example transformTimeToString(60) // "00:01:00"
 * @example transformTimeToString(3600) // "01:00:00"
 */
export const transformTimeToString = (timeInSeconds: number) => {
  const time = getTimeFromSeconds(timeInSeconds);
  return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`
}
/**
 * 
 * @param timeInSeconds The time in seconds
 * @returns {string} The time in the format HHh MMm SSs
 * @example transformTimeToDisplay(3661) // "01h 01m 01s"
 * @example transformTimeToDisplay(60) // "00h 01m 00s"
 * @example transformTimeToDisplay(3600) // "01h 00m 00s"
 */
export const transformTimeToDisplay = (timeInSeconds: number) => {
  const time = getTimeFromSeconds(timeInSeconds);
  return `${time.hours.toString().padStart(2, '0')}h ${time.minutes.toString().padStart(2, '0')}m ${time.seconds.toString().padStart(2, '0')}s`
}