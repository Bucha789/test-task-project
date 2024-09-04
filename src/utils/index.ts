export const reproduceAudio = (audioUrl: string) => {
  const audioElement = new Audio(audioUrl);
  audioElement.play();
}