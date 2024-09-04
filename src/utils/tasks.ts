import { LONG_TIME, MEDIUM_TIME, SHORT_TIME } from "../constants";

export const getTaskType = (duration: number) => {
  if (duration === SHORT_TIME) {
    return "short";
  }
  if (duration === MEDIUM_TIME) {
    return "medium";
  }
  if (duration === LONG_TIME) {
    return "long";
  }
  return "custom";
}