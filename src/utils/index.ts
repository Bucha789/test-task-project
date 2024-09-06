export const reproduceAudio = (audioUrl: string) => {
  const audioElement = new Audio(audioUrl);
  audioElement.play();
}

export const transformToObj = <T, K> (string: string | null, safetyValue: K) => {
  if (!string) return safetyValue;
  return JSON.parse(string) as T;
}