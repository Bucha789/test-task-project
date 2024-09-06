
/**
 * @description: This file contains utility functions that can be used across the application.
 * @param {string} audioUrl - The URL of the audio file to be played locally.
 * @returns {void} - This function does not return anything.
*/
export const reproduceAudio = (audioUrl: string) => {
  const audioElement = new Audio(audioUrl);
  audioElement.play();
}
/**
 * @description: This function transforms and string into an object.
 * @param {string | null} string - The string to be parsed.
 * @param safetyValue - The value to return if the string is null.
 * @returns - The parsed object.
 * @example transformToObj<{ name: string }, { name: string }>(null, { name: 'John Doe' }) // { name: 'John Doe' }
 */
export const transformToObj = <T, K> (string: string | null, safetyValue: K) => {
  if (!string) return safetyValue;
  return JSON.parse(string) as T;
}