export const getTaskType = (duration: number) => {
  if (duration === 1800) {
    return "short";
  }
  if (duration === 2700) {
    return "medium";
  }
  if (duration === 3600) {
    return "long";
  }
  return "custom";
}